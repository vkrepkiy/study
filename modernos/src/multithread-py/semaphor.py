#!/usr/bin/env python

# Semaphore + mutex example for Python 3

from threading import BoundedSemaphore, RLock, Thread
from time import sleep

# Setup vars
MAX_USERS = 5
TRY_USERS = 10
ids = []

# Create semaphore for max users
semaphor = BoundedSemaphore(MAX_USERS)
# We have shared ids var, so create mutex
mutex = RLock()


# Connect user by id with timeout
def connectUser(id):
    global ids
    mutex.acquire()

    try:
        ids.index(id)
    except ValueError:
        semaphor.acquire()
        ids.append(id)
    finally:
        mutex.release()
        print('User', id, 'connected')


for i in range(TRY_USERS):
    id = 'id_' + str(i)
    threadConnect = Thread(target=lambda *args: connectUser(id))
    # Run thread
    threadConnect.start()
    threadConnect.join(0.1)

if len(ids) != MAX_USERS:
    print('Something is wrong. Users:', ids, '. Current length:',
          len(ids), ', max length:', MAX_USERS, ', tried:', TRY_USERS)
    exit(1)
else:
    print('Semaphor works:', len(ids), 'users of', TRY_USERS, 'connected')
    exit(0)
