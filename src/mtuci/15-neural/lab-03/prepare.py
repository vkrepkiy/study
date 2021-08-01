import shutil
import os

data_dir = 'dogs-vs-cats/train'
train_dir = 'train'
validation_dir = 'validation'
test_dir = 'test'

test_data_portion = 0.15
val_data_portion = 0.15
images_per_class = 12500


def create_directory(dir_name):
    if os.path.exists(dir_name):
        shutil.rmtree(dir_name)
    os.makedirs(dir_name)
    os.makedirs(os.path.join(dir_name, "cats"))
    os.makedirs(os.path.join(dir_name, "dogs"))


# Create all dirs
create_directory(train_dir)
create_directory(validation_dir)
create_directory(test_dir)


def copy_images(start_index, end_index, source_dir, dest_dir):
    for i in range(start_index, end_index):
        shutil.copy2(os.path.join(source_dir, "cat." + str(i) + ".jpg"),
                     os.path.join(dest_dir, "cats"))
        shutil.copy2(os.path.join(source_dir, "dog." + str(i) + ".jpg"),
                     os.path.join(dest_dir, "dogs"))


start_val_data_idx = int(
    images_per_class * (1 - val_data_portion - test_data_portion))
start_test_data_idx = int(images_per_class * (1 - test_data_portion))
print(start_val_data_idx)
print(start_test_data_idx)

copy_images(0, start_val_data_idx, data_dir, train_dir)
copy_images(start_val_data_idx, start_test_data_idx, data_dir, validation_dir)
copy_images(start_test_data_idx, images_per_class, data_dir, test_dir)
