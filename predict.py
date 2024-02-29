# import sys
# import json
# print("starting python")
# # import joblib
# input_data = json.loads(sys.stdin.read())
# print(input_data)


import sys
import joblib
import numpy as np
# Get the space-separated string from the command-line argument
space_separated_string = sys.argv[1]

# Split the string into an array using a space as the separator
array = space_separated_string.split()

float_array = list(map(float, array))

# Read the input data from command-line argument
#input_data = float(array)

# Load the saved model
model = joblib.load('random_forest_model.joblib')
pre_shaped = np.array(float_array)
shaped = pre_shaped.reshape(1, -1)
# sample_pred = np.array([0.294, 0.5, 0.594, 0.358, -10.906, 0.0289, 121.761, 0.853, 1986, 5.858433333])
# input_array_reshaped = sample_pred.reshape(1, -1)
# Make prediction using the input data
prediction = model.predict(shaped)

# Print the prediction
print(prediction[0])
sys.exit()
