#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Production-quality redesigned Lookupp nonprofit website (Next.js). Backend must persist contact form and business inquiry form submissions to MongoDB."

backend:
  - task: "Contact form API (POST/GET /api/contact)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "POST /api/contact stores {name,email,message} with uuid + createdAt into contact_submissions. Validates required fields (400 if missing). GET returns list without _id. Uses UUID, no ObjectID."
        -working: true
        -agent: "testing"
        -comment: "✅ All tests passed. POST /api/contact: (1) Valid data returns 200 with {success:true, submission:{...}} containing UUID id (2d1c7467-d08a-49d1-b548-276ed0ebe160), no _id field, all fields present, createdAt timestamp. (2) Missing required field returns 400 with error message. GET /api/contact: Returns 200 with array, no _id fields, all items have valid UUIDs, data persists correctly (verified submission from POST test is retrievable)."

  - task: "Business inquiry API (POST/GET /api/business)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "POST /api/business stores all business fields (businessName, contactName, email, phone, website, address, businessType, description, rewards, notes) with uuid + createdAt into business_submissions. Requires businessName, contactName, email (400 otherwise). GET returns list without _id."
        -working: true
        -agent: "testing"
        -comment: "✅ All tests passed. POST /api/business: (1) Valid data with all fields returns 200 with {success:true, submission:{...}} containing UUID id (825397b9-c593-4c98-8eae-da94af5e8b8b), no _id field, all 10 fields present (businessName, contactName, email, phone, website, address, businessType, description, rewards, notes), createdAt timestamp. (2) Missing required field (email) returns 400 with error message. GET /api/business: Returns 200 with array, no _id fields, all items have valid UUIDs, data persists correctly (verified submission from POST test is retrievable)."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: "Please test the two POST endpoints and their GET counterparts. Validate: (1) successful insert returns {success:true, submission:{...}} with a uuid id, (2) missing required fields returns 400, (3) GET returns array of stored docs without Mongo _id. Base URL is the ingress /api prefix."
    -agent: "testing"
    -message: "Backend testing complete. All 6 tests passed successfully. Both /api/contact and /api/business endpoints are working correctly: (1) POST with valid data returns 200 with UUID ids (not ObjectID), (2) POST with missing required fields returns 400, (3) GET returns arrays without _id fields, (4) Data persists correctly in MongoDB. No critical issues found. Backend is production-ready."