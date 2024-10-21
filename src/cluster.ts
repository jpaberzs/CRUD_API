import cluster from 'cluster';
import { cpus } from 'os';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { routeHandler } from './routes/userRoutes';

const PORT = process.env.PORT || 4000;
const numCPUs = cpus().length - 1;

let currentWorker = 0;

if (cluster.isPrimary) {
  console.log(`Master process started on port ${PORT}`);

  const loadBalancer = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      const worker = cluster.workers![(++currentWorker % numCPUs) + 1];

      if (worker) {
        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          const body = Buffer.concat(chunks).toString();

          // Send request data to worker
          worker.send({
            method: req.method,
            url: req.url,
            headers: req.headers,
            body,
          });

          // Receive response from worker
          worker.once('message', (response: Response) => {
            res.writeHead(response.status, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(response.statusText));
          });
        });
      }
    }
  );

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer running on http://localhost:${PORT}`);
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, forking a new one.`);
    cluster.fork();
  });
} else {
  const workerPort = +PORT + cluster.worker!.id;

  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeHandler({ req, res });
  });

  server.listen(workerPort, () => {
    console.log(`Worker ${cluster.worker!.id} listening on port ${workerPort}`);
  });
}
