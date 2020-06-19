import numpy
from tensorflow import keras, config

# Fix memory issue,
# Restrict TensorFlow to only allocate 1GB * 5 of memory on the first GPU
gpus = config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        config.experimental.set_virtual_device_configuration(
            gpus[0],
            [config.experimental.VirtualDeviceConfiguration(memory_limit=1024 * 5)])
        logical_gpus = config.experimental.list_logical_devices('GPU')
        print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
    except RuntimeError as e:
        # Virtual devices must be set before GPUs have been initialized
        print(e)

# Fix random seed
numpy.random.seed(42)

# Fetch CIFAR-10 data
(train_images, train_labels), (test_images,
                               test_labels) = keras.datasets.cifar10.load_data()

# Normalize data
train_images = train_images / 255.0
test_images = test_images / 255.0

# Convert enum to category
train_labels = keras.utils.to_categorical(train_labels, 10)
test_labels = keras.utils.to_categorical(test_labels, 10)

model = keras.models.Sequential()
# input_shape - 32x32 - image diminsions, 3 channels (RGB)
model.add(keras.layers.Conv2D(
    32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
model.add(keras.layers.Conv2D(32, (3, 3), activation='relu'))
model.add(keras.layers.MaxPooling2D((2, 2)))
model.add(keras.layers.Dropout(0.25))
model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
model.add(keras.layers.MaxPooling2D((2, 2)))
model.add(keras.layers.Dropout(0.25))
model.add(keras.layers.Flatten())
model.add(keras.layers.Dense(512, activation='relu'))
model.add(keras.layers.Dropout(0.5))
# "10" is our classes count
model.add(keras.layers.Dense(10, activation='softmax'))

print(model.summary())

sgd = keras.optimizers.SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy',
              optimizer=sgd,
              metrics=['accuracy'])

model.fit(train_images, train_labels,
          batch_size=32,
          epochs=25,
          validation_split=0.1,
          shuffle=True)

scores = model.evaluate(test_images, test_labels, verbose=0)
print("Точность работы на тестовых данных: %.2f%%" % (scores[1]*100))
