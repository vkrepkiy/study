from time import sleep
from shared import getFifo


# Send data to default FIFO channel
def sendData(data):
    fifo = getFifo("w")
    fifo.write(data)
    fifo.close()


# Create input loop
while True:
    data = input(
        "\n[Client] Enter string to send (type 'exit' to terminate): ")

    if data == "exit":
        exit(0)

    sendData(data)

    # Add small pause to improve console output readability
    sleep(0.1)
