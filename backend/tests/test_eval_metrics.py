import unittest
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from app import eval_metrics  

class TestEvalMetrics(unittest.TestCase):
    def test_eval_metrics(self):
        actual = [1, 0, 1, 1, 0, 10]
        pred = [1, 0, 1, 0, 0, 1]
        
        # Expected values
        expected_accuracy = accuracy_score(actual, pred)
        expected_precision = precision_score(actual, pred, average="weighted")
        expected_recall = recall_score(actual, pred, average="weighted")
        expected_f1 = f1_score(actual, pred, average="weighted")
        
        # Call the function
        accuracy, precision, recall, f1 = eval_metrics(actual, pred)
        
        # Assert each metric
        self.assertAlmostEqual(accuracy, expected_accuracy, places=5)
        self.assertAlmostEqual(precision, expected_precision, places=5)
        self.assertAlmostEqual(recall, expected_recall, places=5)
        self.assertAlmostEqual(f1, expected_f1, places=5)

if __name__ == "__main__":
    unittest.main()
