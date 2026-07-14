#!/usr/bin/env python3
"""
Backend API Testing Script for Lookupp
Tests contact and business inquiry endpoints with NEW field set
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

def test_business_post_valid_new_fields():
    """Test POST /api/business with NEW field set"""
    print("\n" + "="*80)
    print("TEST 1: POST /api/business with NEW field set (valid data)")
    print("="*80)
    
    try:
        payload = {
            "firstName": "Jane",
            "lastName": "Doe",
            "business": "Acme Coffee",
            "email": "jane@acme.com",
            "phone": "(555) 123-4567",
            "reward": "Free drinks",
            "businessName": "Acme Coffee",
            "contactName": "Jane Doe"
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
        
        # Check for UUID id (not Mongo ObjectID)
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
        
        # Verify all submitted fields are present
        for key in payload:
            if key not in submission:
                print(f"❌ FAILED: Missing field '{key}' in submission")
                return False
            if submission.get(key) != payload[key]:
                print(f"❌ FAILED: {key} mismatch - expected '{payload[key]}', got '{submission.get(key)}'")
                return False
        
        if not submission.get("createdAt"):
            print("❌ FAILED: Missing createdAt field")
            return False
        
        print("✅ PASSED: POST /api/business with NEW field set")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_business_post_missing_email():
    """Test POST /api/business with missing email"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/business missing email field")
    print("="*80)
    
    try:
        payload = {
            "firstName": "John",
            "lastName": "Smith",
            "business": "Test Business",
            "phone": "(555) 999-8888",
            "businessName": "Test Business"
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
        
        print("✅ PASSED: POST /api/business correctly rejects missing email")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_business_post_missing_business_and_businessname():
    """Test POST /api/business with missing both business and businessName"""
    print("\n" + "="*80)
    print("TEST 3: POST /api/business missing both business and businessName")
    print("="*80)
    
    try:
        payload = {
            "firstName": "Alice",
            "lastName": "Brown",
            "email": "alice@example.com",
            "phone": "(555) 777-6666"
            # both business and businessName are missing
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
        
        print("✅ PASSED: POST /api/business correctly rejects missing business/businessName")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_business_get():
    """Test GET /api/business"""
    print("\n" + "="*80)
    print("TEST 4: GET /api/business")
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
            
            # Check that _id is not present in any item
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
                if item.get("email") == "jane@acme.com":
                    found = True
                    print("✅ Found submission from Test 1 in GET response")
                    # Verify it has the expected fields
                    if item.get("firstName") == "Jane" and item.get("business") == "Acme Coffee":
                        print("✅ Submission has correct field values")
                    break
            
            if not found:
                print("⚠️  WARNING: Submission from Test 1 not found in GET response")
        
        print("✅ PASSED: GET /api/business")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_contact_post_valid():
    """Test POST /api/contact with valid data (regression check)"""
    print("\n" + "="*80)
    print("TEST 5: POST /api/contact with valid data (regression)")
    print("="*80)
    
    try:
        payload = {
            "name": "Robert Martinez",
            "email": "robert.martinez@example.com",
            "message": "I'm interested in volunteering with your organization and would like more information about upcoming opportunities."
        }
        
        print(f"Sending POST to {BASE_URL}/contact")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
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
        
        print("✅ PASSED: POST /api/contact (regression)")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_contact_post_missing_field():
    """Test POST /api/contact with missing required field (regression check)"""
    print("\n" + "="*80)
    print("TEST 6: POST /api/contact with missing field (regression)")
    print("="*80)
    
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com"
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
        
        print("✅ PASSED: POST /api/contact correctly rejects missing field (regression)")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_contact_get():
    """Test GET /api/contact (regression check)"""
    print("\n" + "="*80)
    print("TEST 7: GET /api/contact (regression)")
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
        
        print("✅ PASSED: GET /api/contact (regression)")
        return True
        
    except Exception as e:
        print(f"❌ FAILED with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("LOOKUPP BACKEND API TESTS - NEW FIELD SET")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    
    results = []
    
    # Run all tests - business endpoint with NEW fields first
    results.append(("POST /api/business (NEW fields - valid)", test_business_post_valid_new_fields()))
    results.append(("POST /api/business (missing email)", test_business_post_missing_email()))
    results.append(("POST /api/business (missing business & businessName)", test_business_post_missing_business_and_businessname()))
    results.append(("GET /api/business", test_business_get()))
    
    # Regression tests for contact endpoint
    results.append(("POST /api/contact (valid - regression)", test_contact_post_valid()))
    results.append(("POST /api/contact (missing field - regression)", test_contact_post_missing_field()))
    results.append(("GET /api/contact (regression)", test_contact_get()))
    
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
