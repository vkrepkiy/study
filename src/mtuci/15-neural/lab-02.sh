docker run --gpus all --runtime=nvidia -it --rm --mount type=bind,src=$(pwd)/lab-02,dst=/tf/lab-02 -w /tf/lab-02 tensorflow/tensorflow:latest-gpu python main.py
