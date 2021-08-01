docker run --gpus all --runtime=nvidia -it --rm --mount type=bind,src=$(pwd)/lab-01,dst=/tf/lab-01 -w /tf/lab-01 tensorflow/tensorflow:latest-gpu python main.py
