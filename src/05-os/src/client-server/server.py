#!/usr/bin/env python3
# coding: utf-8

from time import sleep
from shared import getFifo

print("Server is starting...")


# Run server, listening for default fifo channel
fifo = getFifo("r")


# Run basic event loop
while True:
    data = fifo.read()
    if data:
        print("\n[Server] Data received:", data)