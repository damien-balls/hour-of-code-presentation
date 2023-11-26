from tkinter import Tk
import numpy as np
import matplotlib.pyplot as plt

class NeuralNetwork:
    def __init__(self, learning_rate):
        self.weights = np.array([np.random.randn(), np.random.randn()])
        self.bias = np.random.randn()
        self.learning_rate = learning_rate
        print("weights:")
        print(self.weights)
        print("bias: ")
        print(self.bias)
        print("learning rate:")
        print(self.learning_rate)

    def _sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def _sigmoid_deriv(self, x):
        return self._sigmoid(x) * (1 - self._sigmoid(x))

    def predict(self, input_vector):
        layer_1 = np.dot(input_vector, self.weights) + self.bias
        layer_2 = self._sigmoid(layer_1)
        prediction = layer_2
        print("prediction ")
        print(prediction)
        return prediction

    def _compute_gradients(self, input_vector, target):
        layer_1 = np.dot(input_vector, self.weights) + self.bias
        layer_2 = self._sigmoid(layer_1)
        prediction = layer_2

        derror_dprediction = 2 * (prediction - target)
        dprediction_dlayer1 = self._sigmoid_deriv(layer_1)
        dlayer1_dbias = 1
        dlayer1_dweights = (0 * self.weights) + (1 * input_vector)

        derror_dbias = (
            derror_dprediction * dprediction_dlayer1 * dlayer1_dbias
        )
        derror_dweights = (
            derror_dprediction * dprediction_dlayer1 * dlayer1_dweights
        )
        print("error bias and error weights:")
        print(derror_dbias, derror_dweights)
        return derror_dbias, derror_dweights

    def _update_parameters(self, derror_dbias, derror_dweights):
        self.bias = self.bias - (derror_dbias * self.learning_rate)
        self.weights = self.weights - (
            derror_dweights * self.learning_rate
        )
        print("new bias and new weights")
        print(self.bias, self.weights)


    def train(self, input_vectors, targets, iterations):
        cumulative_errors = []
        print(f"cumilitibe errors: {cumulative_errors}")
        for current_iteration in range(iterations):
            # Pick a data instance at random
            random_data_index = np.random.randint(len(input_vectors))

            input_vector = input_vectors[random_data_index]
            target = targets[random_data_index]

            # Compute the gradients and update the weights
            derror_dbias, derror_dweights = self._compute_gradients(
                input_vector, target
            )

            self._update_parameters(derror_dbias, derror_dweights)

            # Measure the cumulative error for all the instances
            if current_iteration % 100 == 0:
                cumulative_error = 0
                # Loop through all the instances to measure the error
                for data_instance_index in range(len(input_vectors)):
                    data_point = input_vectors[data_instance_index]
                    target = targets[data_instance_index]

                    prediction = self.predict(data_point)
                    error = np.square(prediction - target)

                    cumulative_error = cumulative_error + error
                cumulative_errors.append(cumulative_error)

        return cumulative_errors 

input_vectors = np.array(
    [
        [3, 1.5], #1
        [2, 1],#2
        [4, 1.5],#3
        [3, 4],#4
        [3.5, 0.5],#5
        [2, 0.5],#6
        [5.5, 1],#7
        [1, 1],#8
        [0.8, 1.2],#9
        [3, 0.9],#10
        [0.2, 1.8],#11
        [2.1, 0.9],#12
        [0.8, 1.5],#13
        [0.9, 0.6],#14
        [1.2, 1.3],#15
    ]
)
#                   1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
targets = np.array([0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1])

learning_rate = 0.1

neural_network = NeuralNetwork(learning_rate)

training_error = neural_network.train(input_vectors, targets, 1000000)

plt.plot(training_error)
plt.xlabel("Iterations")
plt.ylabel("Error for all training instances")
plt.savefig("cumulative_error.png")