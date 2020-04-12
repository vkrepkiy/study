OUT_DIR = ./bin
SRC_DIR = ./src
HELLOWORLD = helloworld
PREFIX = /usr/local/bin

.PHONY: all clean install uninstall

# Prepare dir
prepare:
	mkdir -p $(OUT_DIR)
# Clean out dir
clean:
	rm -rf $(OUT_DIR)/* && mkdir -p $(OUT_DIR)

# Build HELLOWORLD
$(HELLOWORLD): prepare
	g++ -o $(OUT_DIR)/main.out $(SRC_DIR)/main.cpp
	g++ -o $(OUT_DIR)/helloworld.out $(SRC_DIR)/helloworld.cpp
	g++ -o $(OUT_DIR)/$(HELLOWORLD) $(OUT_DIR)/main.out $(OUT_DIR)/helloworld.out
# Install
install-$(HELLOWORLD):
	install $(OUT_DIR)/$(HELLOWORLD) $(PREFIX)
uninstall-$(HELLOWORLD):
	rm -rf $(PREFIX)/$(HELLOWORLD)

