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
const {
    dialog,
} = require('electron');  
const Risk = require('../../../../lib/src/model/classes/Risk/risk');

/**
  * add default risk row
  * @param {ISRAProject} israProject current ISRA Project
*/
const addRisk = (israProject) =>{
    try {
        const risk = new Risk();
        israProject.addRisk(risk);
        return [risk.properties];
    } catch (err) {
        return dialog.showMessageBoxSync(null, { message: 'Failed to add Risk' });
    }
};

/**
  * delete selected risk row(s)
  * @param {ISRAProject} israProject current ISRA Project
  * @param {Array} ids of risk id(s)
*/
const deleteRisk = (israProject, ids) => {
    try {
        ids.forEach((id) => {
            israProject.deleteRisk(Number(id));
        });
    } catch (err) {
      dialog.showMessageBoxSync(null, { message: 'Failed to delete risk(s)' });
    }
};

module.exports = {
    addRisk,
    deleteRisk
};