#!/usr/bin/env python3
"""
Backend API Testing Script for Lookupp
Tests contact and business inquiry endpoints
"""

import requests
import json
import uuid
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://people-first-web.preview.emergentagent.com/api"

def is_valid_uuid(val):
    """Check if a value is a valid UUID"""
    try:
        uuid.UUID(str(val))
        return True
    except (ValueError, AttributeError):
        return False

def test_contact_post_valid():
    """Test POST /api/contact with valid data"""
    print("\n" + "="*80)
    print("TEST 1: POST /api/contact with valid data")
    print("="*80)
    
    try:
        payload = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@example.com",
            "message": "I would like to learn more about your nonprofit programs and how I can get involved in the community."
        }
        
        print(f"Sending POST to {BASE_URL}/contact")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 200:
            print("❌ FAILED: Expected status 200")
            return False
        
        data = response.json()
        
        if not data.get("success"):
            print("❌ FAILED: Expected success=true")
            return False
        
        submission = data.get("submission")
        if not submission:
            print("❌ FAILED: Missing submission object")
            return False
        
        # Check for UUID id
        if not submission.get("id"):
            print("❌ FAILED: Missing id field")
            return False
        
        if not is_valid_uuid(submission["id"]):
            print(f"❌ FAILED: id '{submission['id']}' is not a valid UUID")
            return False
        
        # Check for _id (should NOT be present)
        if "_id" in submission:
            print("❌ FAILED: Mongo _id field should not be present in response")
            return False
        
        # Verify all fields
        if submission["name"] != payload["name"]:
            print("❌ FAILED: name mismatch")
            return False
        
        if submission["email"] != payload["email"]:
            print("❌ FAILED: email mismatch")
            return False
        
        if submission["message"] != payload["message"]:
            print("❌ FAILED: message mismatch")
            return False
        
        if not submission.get("createdAt"):
            print("❌ FAILED: Missing createdAt field")
            return False
        
        print("✅ PASSED: POST /api/contact with valid data")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        return False

def test_contact_post_missing_field():
    """Test POST /api/contact with missing required field"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/contact with missing message field")
    print("="*80)
    
    try:
        payload = {
            "name": "John Doe",
            "email": "john.doe@example.com"
            # message is missing
        }
        
        print(f"Sending POST to {BASE_URL}/contact")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get("error"):
            print("❌ FAILED: Expected error message in response")
            return False
        
        print("✅ PASSED: POST /api/contact correctly rejects missing field")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        return False

def test_contact_get():
    """Test GET /api/contact"""
    print("\n" + "="*80)
    print("TEST 3: GET /api/contact")
    print("="*80)
    
    try:
        print(f"Sending GET to {BASE_URL}/contact")
        
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not isinstance(data, list):
            print("❌ FAILED: Expected array response")
            return False
        
        print(f"Retrieved {len(data)} contact submissions")
        
        if len(data) > 0:
            print(f"Sample submission: {json.dumps(data[0], indent=2)}")
            
            # Check that _id is not present
            for item in data:
                if "_id" in item:
                    print("❌ FAILED: Mongo _id field should not be present in GET response")
                    return False
                
                if not item.get("id"):
                    print("❌ FAILED: Missing id field in submission")
                    return False
                
                if not is_valid_uuid(item["id"]):
                    print(f"❌ FAILED: id '{item['id']}' is not a valid UUID")
                    return False
            
            # Check if the submission from test 1 is present
            found = False
            for item in data:
                if item.get("email") == "sarah.johnson@example.com":
                    found = True
                    print("✅ Found submission from Test 1 in GET response")
                    break
            
            if not found:
                print("⚠️  WARNING: Submission from Test 1 not found in GET response")
        
        print("✅ PASSED: GET /api/contact")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        return False

def test_business_post_valid():
    """Test POST /api/business with valid data"""
    print("\n" + "="*80)
    print("TEST 4: POST /api/business with valid data")
    print("="*80)
    
    try:
        payload = {
            "businessName": "Green Valley Organic Farm",
            "contactName": "Michael Chen",
            "email": "michael@greenvalleyfarm.com",
            "phone": "555-0123",
            "website": "https://greenvalleyfarm.com",
            "address": "123 Farm Road, Valley City, CA 94000",
            "businessType": "Agriculture",
            "description": "Organic farm specializing in sustainable produce and community-supported agriculture programs",
            "rewards": "10% discount for nonprofit partners, free delivery for bulk orders",
            "notes": "Interested in partnering with local food banks"
        }
        
        print(f"Sending POST to {BASE_URL}/business")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/business", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get("success"):
            print("❌ FAILED: Expected success=true")
            return False
        
        submission = data.get("submission")
        if not submission:
            print("❌ FAILED: Missing submission object")
            return False
        
        # Check for UUID id
        if not submission.get("id"):
            print("❌ FAILED: Missing id field")
            return False
        
        if not is_valid_uuid(submission["id"]):
            print(f"❌ FAILED: id '{submission['id']}' is not a valid UUID")
            return False
        
        # Check for _id (should NOT be present)
        if "_id" in submission:
            print("❌ FAILED: Mongo _id field should not be present in response")
            return False
        
        # Verify all fields
        for key in payload:
            if submission.get(key) != payload[key]:
                print(f"❌ FAILED: {key} mismatch")
                return False
        
        if not submission.get("createdAt"):
            print("❌ FAILED: Missing createdAt field")
            return False
        
        print("✅ PASSED: POST /api/business with valid data")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        return False

def test_business_post_missing_field():
    """Test POST /api/business with missing required field"""
    print("\n" + "="*80)
    print("TEST 5: POST /api/business with missing email field")
    print("="*80)
    
    try:
        payload = {
            "businessName": "Test Business",
            "contactName": "Jane Smith"
            # email is missing
        }
        
        print(f"Sending POST to {BASE_URL}/business")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/business", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 400:
            print(f"❌ FAILED: Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get("error"):
            print("❌ FAILED: Expected error message in response")
            return False
        
        print("✅ PASSED: POST /api/business correctly rejects missing field")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        return False

def test_business_get():
    """Test GET /api/business"""
    print("\n" + "="*80)
    print("TEST 6: GET /api/business")
    print("="*80)
    
    try:
        print(f"Sending GET to {BASE_URL}/business")
        
        response = requests.get(f"{BASE_URL}/business", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not isinstance(data, list):
            print("❌ FAILED: Expected array response")
            return False
        
        print(f"Retrieved {len(data)} business submissions")
        
        if len(data) > 0:
            print(f"Sample submission: {json.dumps(data[0], indent=2)}")
            
            # Check that _id is not present
            for item in data:
                if "_id" in item:
                    print("❌ FAILED: Mongo _id field should not be present in GET response")
                    return False
                
                if not item.get("id"):
                    print("❌ FAILED: Missing id field in submission")
                    return False
                
                if not is_valid_uuid(item["id"]):
                    print(f"❌ FAILED: id '{item['id']}' is not a valid UUID")
                    return False
            
            # Check if the submission from test 4 is present
            found = False
            for item in data:
                if item.get("email") == "michael@greenvalleyfarm.com":
                    found = True
                    print("✅ Found submission from Test 4 in GET response")
                    break
            
            if not found:
                print("⚠️  WARNING: Submission from Test 4 not found in GET response")
        
        print("✅ PASSED: GET /api/business")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("LOOKUPP BACKEND API TESTS")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    
    results = []
    
    # Run all tests
    results.append(("POST /api/contact (valid)", test_contact_post_valid()))
    results.append(("POST /api/contact (missing field)", test_contact_post_missing_field()))
    results.append(("GET /api/contact", test_contact_get()))
    results.append(("POST /api/business (valid)", test_business_post_valid()))
    results.append(("POST /api/business (missing field)", test_business_post_missing_field()))
    results.append(("GET /api/business", test_business_get()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed!")
        sys.exit(0)
    else:
        print(f"\n⚠️  {total - passed} test(s) failed")
        sys.exit(1)

if __name__ == "__main__":
    main()
