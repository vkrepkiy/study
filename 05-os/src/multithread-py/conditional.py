#!/usr/bin/env python3
# coding: utf-8

import threading
from time import sleep
from termcolor import colored

print('Программа предоставляет пример 2-х процессов, которые в event loop проверяют значение переменной\n')

# Define consumer fn
def client(cv):
    print('Процесс запущен')
    with cv:
        cv.wait()
        print('Процесс продолжил выполнение кода')
        sleep(1)
        print('Процесс завершает работу')
        exit(0)


# Define producer fn
def makeResourceAvailable(cv):
    with cv:
        print('Отправляем событие "Ресурс доступен"')
        cv.notifyAll()


# Create condition (with RLock as default lock)
condition = threading.Condition()

consumerThread1 = threading.Thread(
    name='consumer1', target=client, args=(condition,))
consumerThread2 = threading.Thread(
    name='consumer2', target=client, args=(condition,))
orchestratorThread = threading.Thread(name='producer', target=makeResourceAvailable, args=(condition,))


# Run code
consumerThread1.start()
sleep(2)
consumerThread2.start()
sleep(2)
orchestratorThread.start()

if __name__ == "__main__":
    print(colored('OK', 'green'))
    exit(0)
