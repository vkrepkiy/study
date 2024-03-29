#!/usr/bin/env python3
# coding: utf-8

# Mutual exclusion demonstration on Python 3 with Lock

from termcolor import colored
from threading import Lock, Thread

print("Программа выполняет сложение и вычитание с использованием общих ресурсов\n")

# Use Lock as Mutex
lockAsMutex = Lock()
# We are going to use this shared resource
shared_int = 0
# Setup times to eval each operation in a thread
repeatOperationLimit = 100000
# Setup times to run tests
repeatTestLimit = 10

# Append number
def add(value, useMutex):
    if useMutex:
        lockAsMutex.acquire()

    global shared_int
    shared_int = value + shared_int

    if useMutex:
        lockAsMutex.release()


# Subtract number
def subtract(value, useMutex):
    if useMutex:
        lockAsMutex.acquire()

    global shared_int
    shared_int = shared_int - value

    if useMutex:
        lockAsMutex.release()


# Run Fn multiple times
def runTimes(fn, useMutex, limit):
    for i in range(limit):
        fn(i, useMutex)


# Run example with mutex
def runWithMutex():
    thread1 = Thread(target=runTimes, args=(
        subtract, True, repeatOperationLimit))
    thread2 = Thread(target=runTimes, args=(add, True, repeatOperationLimit))
    thread1.start()
    thread2.start()
    thread1.join()
    thread2.join()

    return shared_int


# Run example without mutex
def runWithoutMutex():
    thread3 = Thread(target=runTimes, args=(
        subtract, False, repeatOperationLimit))
    thread4 = Thread(target=runTimes, args=(add, False, repeatOperationLimit))
    thread3.start()
    thread4.start()
    thread3.join()
    thread4.join()

    return shared_int


# Run tests for Mutex
print('Запуск тестов. Результат, отличный от 0 считается некорректным')
print(colored('Запуск тестов с применением мьютексов', 'yellow'))
hasError = False
for i in range(repeatTestLimit):
    result = runWithMutex()
    if result != 0:
        hasError = True

if hasError:
    print(colored('Что-то пошло не так.', 'red'))
else:
    print(colored('ОК', 'green'))

print('Результат равен', result)

# Reset vars
hasError = False
shared_int = 0

# Run tests without Mutex
print(colored('Запуск тестов без мьютексов', 'yellow'))
hasError = False
for i in range(repeatTestLimit):
    result = runWithoutMutex()
    if result != 0:
        hasError = True

if hasError:
    print(colored('Что-то пошло не так.', 'red'))
else:
    print(colored('ОК', 'green'))

print('Результат равен', result)

if __name__ == "__main__":
    exit(0)
