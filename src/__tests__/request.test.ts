import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import { app } from '../app';

describe('CRUD API Tests', () => {
  let createdUserId: string;

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'Test User',
        age: 22,
        hobbies: ['s', 'c', 'h'],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('Test User');
    createdUserId = response.body.id;
  });

  it('should retrieve the created user', async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body.username).toBe('Test User');
  });

  it('should update the User', async () => {
    const response = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send({
        username: 'Updated Test User',
        age: 22,
        hobbies: ['s', 'c', 'h'],
      });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('Updated Test User');
  });

  it('should delete the user', async () => {
    const response = await request(app).delete(`/api/users/${createdUserId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'User successfully deleted'
    );
  });
});
