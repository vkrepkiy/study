OUT_DIR = ./bin
SRC_DIR = ./src
TARGET = helloworld
PREFIX = /usr/local/bin

.PHONY: all clean install uninstall

all: $(TARGET)

# Build all
$(TARGET): clean main.o helloworld.o
	g++ -o $(OUT_DIR)/$(TARGET) $(OUT_DIR)/main.o $(OUT_DIR)/helloworld.o
# Clean out dir
clean:
	rm -rf $(TARGET) $(OUT_DIR)/* && mkdir -p $(OUT_DIR)

# Prepare files
main.o:
	g++ -c -o $(OUT_DIR)/main.o $(SRC_DIR)/main.cpp
helloworld.o:
	g++ -c -o $(OUT_DIR)/helloworld.o $(SRC_DIR)/helloworld.cpp

# Install
install:
	install $(OUT_DIR)/$(TARGET) $(PREFIX)
uninstall:
	rm -rf $(PREFIX)/$(TARGET)
