/*----------------------------------------------------------------------------
*
*     Copyright © 2022 THALES. All Rights Reserved.
 *
* -----------------------------------------------------------------------------
* THALES MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
* THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THALES SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 * MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*
* THIS SOFTWARE IS NOT DESIGNED OR INTENDED FOR USE OR RESALE AS ON-LINE
* CONTROL EQUIPMENT IN HAZARDOUS ENVIRONMENTS REQUIRING FAIL-SAFE
* PERFORMANCE, SUCH AS IN THE OPERATION OF NUCLEAR FACILITIES, AIRCRAFT
* NAVIGATION OR COMMUNICATION SYSTEMS, AIR TRAFFIC CONTROL, DIRECT LIFE
* SUPPORT MACHINES, OR WEAPONS SYSTEMS, IN WHICH THE FAILURE OF THE
* SOFTWARE COULD LEAD DIRECTLY TO DEATH, PERSONAL INJURY, OR SEVERE
* PHYSICAL OR ENVIRONMENTAL DAMAGE ("HIGH RISK ACTIVITIES"). THALES
* SPECIFICALLY DISCLAIMS ANY EXPRESS OR IMPLIED WARRANTY OF FITNESS FOR
* HIGH RISK ACTIVITIES.
* -----------------------------------------------------------------------------
*/

const { isValidHtml, isValidAttachment, isValidURL } = require('../../schema/validation-pattern/validation');

// contains scope/context of ISRA project
module.exports = class ISRAProjectContext {
  // text input of description of project
  #projectDescription;

  // inserted value of hyperlink of project
  #projectURL;

  // value of attachment of a project descriptive document file
  #projectDescriptionAttachment;

  // text input of objectives from the project/product manager's perspective
  #securityProjectObjectives;

  // text input of objectives from the security officer's perspective
  #securityOfficerObjectives;

  // text input of assumptions made on this project
  #securityAssumptions;

  set projectDescription(projectDescription) {
    if (isValidHtml(projectDescription)) this.#projectDescription = projectDescription;
    else throw new Error('Project description is invalid html string');
  }

  set projectURL(projectURL) {
    if (isValidURL(projectURL)) this.#projectURL = projectURL;
    else throw new Error('Project URL is invalid url string');
  }

  set projectDescriptionAttachment(projectDescriptionAttachment) {
    if (isValidAttachment(projectDescriptionAttachment)) {
      this.#projectDescriptionAttachment = projectDescriptionAttachment;
    } else throw new Error('Project description attachment is invalid base64 string');
  }

  set securityProjectObjectives(securityProjectObjectives) {
    if (isValidHtml(securityProjectObjectives)) {
      this.#securityProjectObjectives = securityProjectObjectives;
    } else throw new Error('Security project objectives is invalid html string');
  }

  set securityOfficerObjectives(securityOfficerObjectives) {
    if (isValidHtml(securityOfficerObjectives)) {
      this.#securityOfficerObjectives = securityOfficerObjectives;
    } else throw new Error('Security officer objectives is invalid html string');
  }

  set securityAssumptions(securityAssumptions) {
    if (isValidHtml(securityAssumptions)) this.#securityAssumptions = securityAssumptions;
    else throw new Error('Security assumptions is invalid html string');
  }

  // get JSON string of relevant properties
  get properties() {
    return {
      projectDescription: this.#projectDescription,
      projectURL: this.#projectURL,
      projectDescriptionAttachment: this.#projectDescriptionAttachment,
      securityProjectObjectives: this.#securityProjectObjectives,
      securityOfficerObjectives: this.#securityOfficerObjectives,
      securityAssumptions: this.#securityAssumptions,
    };
  }
};