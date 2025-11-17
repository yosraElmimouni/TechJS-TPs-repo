const path = require('path');

jest.mock('mongoose', () => ({
  connect: jest.fn(() => Promise.resolve()),
}));

// dynamic import the module after mocking
const mongoose = require('mongoose');

// Because the module executes immediately on import, we require it inside each test when needed

describe('mongodbConnexion main()', () => {
  const modulePath = path.join(process.cwd(), 'DataStorageExercice', 'mongodbConnexion.js');
  let consoleSpy;

  beforeEach(() => {
    jest.resetModules();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('Should attempt to connect to local UsersDB on import', async () => {
    require(modulePath);
    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://127.0.0.1:27017/UsersDB');
  });

  test('Should log "Connected to DB" on successful connection', async () => {
    require(modulePath);
    await Promise.resolve();
    expect(consoleSpy).toHaveBeenCalledWith('Connected to DB');
  });

  test('Should log error if connection fails', async () => {
    jest.resetModules();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    mongoose.connect.mockImplementationOnce(() => Promise.reject(new Error('fail')));
    require(modulePath);
    // allow the catch to run
    await Promise.resolve();
    expect(consoleSpy).toHaveBeenCalled();
    const args = consoleSpy.mock.calls.map(c => c.join(' ')).join(' ');
    expect(args).toMatch(/fail|Error/);
  });

  test('Should call mongoose.connect exactly once per import', async () => {
    require(modulePath);
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
  });

  test('Should not require authentication string by default (comment hint)', async () => {
    require(modulePath);
    const [[connStr]] = mongoose.connect.mock.calls;
    expect(connStr.includes('user:password')).toBe(false);
  });
});
