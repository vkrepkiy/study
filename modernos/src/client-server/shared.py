from os import mkfifo, path

# Setup paths
rootPath = path.dirname(path.abspath(__file__))


# Get fifo channel, return stream
def getFifo(mode="r", name=".tmp_fifo_default"):
    fifoPath = path.join(rootPath, name)

    if not path.exists(fifoPath):
        mkfifo(fifoPath)

    return open(fifoPath, mode)
