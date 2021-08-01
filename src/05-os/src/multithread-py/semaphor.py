#!/usr/bin/env python3
# coding: utf-8

# Semaphore + mutex example for Python 3

from threading import BoundedSemaphore, RLock, Thread
from termcolor import colored
from time import sleep


print("Программа пытается подключить 10 юзеров к БД при лимите в 5\n")

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
        print('Пользователь', id, 'подключен')



for i in range(TRY_USERS):
    id = 'id_' + str(i)
    threadConnect = Thread(target=lambda *args: connectUser(id))
    # Run thread
    threadConnect.daemon = True
    threadConnect.start()
    threadConnect.join(0.1)

hasError = 1 if len(ids) != MAX_USERS else 0

if hasError:
    print(colored('Что-то пошло не так.', 'red'))
else:
    print(colored('ОК', 'green'))

print('Запрошено подключений:', TRY_USERS)
print('Подключено:', len(ids))
print('Лимит:', MAX_USERS)
print('Пользователи:', ids)

if __name__ == "__main__":
    exit(hasError)
