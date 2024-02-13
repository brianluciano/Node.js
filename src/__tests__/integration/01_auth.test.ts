import request from 'supertest';
import { app } from '../../app'; // Import your Express app instance

jest.useFakeTimers();

describe('Get All', () => {
  it('should return an array of existing items', async () => {
    await request(app).get('/item').expect(200);
  });
});
