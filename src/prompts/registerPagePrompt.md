Act as a QA Automation Engineer with expertise in Playwright, TypeScript, and Page Object Model (POM).

Application Under Test:
OpenMRS
URL: https://o2.openmrs.org/openmrs

Objective:
Generate automation code ONLY for the Register Patient workflow using an existing Playwright framework.

Do NOT create framework setup.
Do NOT create BasePage or config files.
Use existing project structure and BasePage methods wherever possible.

Preconditions:
- User is already logged in successfully
- User is already on OpenMRS home page
- Framework already exists with Playwright config, BasePage, and folder structure

----------------------------------------
WORKFLOW: REGISTER PATIENT
----------------------------------------

1. Click “Register a Patient”
2. Verify navigation to registration page

3. Enter Name:
   - Given Name (required)
   - Middle Name (optional)
   - Family Name (required)

4. Click Next

5. Select Gender from dropdown

6. Click Next

7. Enter Date of Birth:
   - Day (textbox)
   - Month (dropdown with values 1–12)
   - Year (textbox)

8. Click Next

9. Enter Address:
   - Address
   - Address 2 (optional)
   - City/Village
   - State/Province
   - Country
   - Postal Code

10. Click Next

11. Enter Phone Number

12. Select Relationship Type from dropdown

13. Enter Related Person Name

14. Click Next

15. Click Confirm

16. Verify:
   - Patient registration is successful
   - Patient name is correctly displayed on final page

----------------------------------------
UI ELEMENT MAPPING RULES
----------------------------------------

- Text inputs → textbox
- Dropdowns → select element (use selectOption)
- Buttons → role button
- Links → role link
- Use getByLabel when available
- Do NOT guess roles incorrectly

----------------------------------------
LOCATOR STRATEGY RULES
----------------------------------------

- Prefer getByRole() for buttons, inputs, links
- Prefer getByLabel() for form fields
- Use id or name attributes if stable
- Avoid:
  - locator().first()
  - locator().nth()
  - XPath unless absolutely necessary
  - fragile selectors

----------------------------------------
STABILITY RULES
----------------------------------------

- Use waitForURL() for page navigation
- Prefer Playwright auto-waits over manual waits
- Avoid waitForTimeout unless absolutely necessary
- Ensure element is visible before interaction

----------------------------------------
ASSERTION RULES
----------------------------------------

- Always verify navigation success
- Do not rely only on full page text
- Prefer specific locators for validation
- Use expect(locator).toContainText() for assertions

----------------------------------------
TEST DATA RULES
----------------------------------------

- Use random data generation
- Month must match dropdown values (1–12, not month names)
- Avoid hardcoded values where possible

----------------------------------------
OUTPUT REQUIREMENTS
----------------------------------------

Generate ONLY:
1. RegisterPatientPage.ts
2. registerPatient.spec.ts

----------------------------------------
STRICT RULES
----------------------------------------

- Do NOT create new framework structure
- Do NOT modify BasePage unless necessary
- Do NOT generate extra files
- Do NOT use unstable locators
- Do NOT add unnecessary waits
- Code must be production-ready and interview-level quality
