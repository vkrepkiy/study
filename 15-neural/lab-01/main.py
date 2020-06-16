import tensorflow as tf
from datetime import datetime
from tensorflow import keras

# Load samples
(train_images, train_labels), (test_images,
                               test_labels) = keras.datasets.fashion_mnist.load_data()

# List all names in human readable form
classes = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
           'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

# Convert images to vectors and normalize
train_images = train_images.reshape(60000, 784) / 255
test_images = test_images.reshape(10000, 784) / 255

# Convert enums to category names
train_labels = keras.utils.to_categorical(train_labels, 10)
test_labels = keras.utils.to_categorical(test_labels, 10)

# Create model and compile
model = keras.models.Sequential()
model.add(keras.layers.Dense(6000, input_dim=784, activation="relu"))
model.add(keras.layers.Dense(400, activation="relu"))
model.add(keras.layers.Dense(10, activation="softmax"))
model.compile(loss="categorical_crossentropy",
              optimizer="SGD", metrics=["accuracy"])

# Show model summary
print(model.summary())

# Run training
history = model.fit(
    train_images,
    train_labels,
    batch_size=50,
    epochs=500,
    validation_split=0.1
)

# Оцениваем качество обучения сети на тестовых данных
scores = model.evaluate(test_images, test_labels, verbose=1)
print("Доля верных ответов на тестовых данных, в процентах:",
      round(scores[1] * 100, 4))

model.save(str(datetime.now()) + '.h5')
