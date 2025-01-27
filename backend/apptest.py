import unittest
import json
from app import app

class TestFlaskApp(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Run once before all tests to initialize the model"""
        cls.client = app.test_client()

        response = cls.client.post('/train', json={})
        assert response.status_code == 200, "Failed to train the model before tests."

    def test_predict_happy_path(self):
        """Test the happy path for the /predict endpoint."""
        input_data = {
            "input": [[1.5, 2.3, 3.1, 3.4]]
        }
        response = self.client.post(
            '/predict',
            data=json.dumps(input_data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertIn("predictions", response_data)
        self.assertIn("target_names", response_data)
        self.assertIsInstance(response_data["predictions"], list)
        self.assertIsInstance(response_data["target_names"], list)

    def test_predict_no_input_data(self):
        """Test the /predict endpoint with no input data."""
        response = self.client.post(
            '/predict',
            data=json.dumps({}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)
        response_data = response.get_json()
        self.assertIn("error", response_data)
        self.assertEqual(response_data["error"], "No input data provided")

    def test_predict_invalid_input_format(self):
        """Test the /predict endpoint with invalid input format."""
        input_data = {
            "input": "invalid_format"
        }
        response = self.client.post(
            '/predict',
            data=json.dumps(input_data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)
        response_data = response.get_json()
        self.assertIn("error", response_data)

if __name__ == '__main__':
    unittest.main()
