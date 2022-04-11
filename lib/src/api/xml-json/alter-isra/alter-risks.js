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

const { counter } = require('../../../utility-global');
const { getHTMLString } = require('../utility');

const alterRisks = (xmlData, risks) => ((xmlDataCopy, risksCopy) => {
  if (Array.isArray(risksCopy)) {
    const riskCounter = counter();
    const riskMitigationCounter = counter();

    risksCopy.forEach((risk) => {
      riskCounter.increment();
      const r = risk;
      const {
        riskId,
        projectName,
        projectVersion,
        ImpactRiskEvaluation,
        LikelihoodRiskEvaluation,
        VulnerabilityRiskEvaluation,
        riskName,
        threatAgent,
        threatVerb,
        motivation,
        businessAssetRef,
        supportingAssetRef,
        Mitigation,
        mitigationsBenefits,
        mitigationsDoneBenefits,
      } = r;

      const { riskLikelihood } = LikelihoodRiskEvaluation[0];
      const { riskImpact, BusinessAssetSelectedProperties } = ImpactRiskEvaluation[0];

      r.projectNameRef = projectName;
      r.projectVersionRef = projectVersion;
      r.riskManagementDetail = getHTMLString(xmlDataCopy, 'riskManagmentDetail', riskCounter.getCount());

      // alter risk name
      r.riskName = {
        riskIdRef: riskId,
        riskName,
        threatAgent,
        threatAgentDetail: getHTMLString(xmlDataCopy, 'threatAgentDetail', riskCounter.getCount()),
        threatVerb,
        threatVerbDetail: getHTMLString(xmlDataCopy, 'threatVerbDetail', riskCounter.getCount()),
        motivation,
        motivationDetail: getHTMLString(xmlDataCopy, 'motivationDetail', riskCounter.getCount()),
        businessAssetRef,
        supportingAssetRef,
      };

      // alter risk likelihood
      if ('OWASPLikelihoodEvaluation' in LikelihoodRiskEvaluation[0].LikelihoodRiskEvaluationMethod[0]) {
        const likelihoodEvaluation = r
          .LikelihoodRiskEvaluation[0]
          .LikelihoodRiskEvaluationMethod[0]
          .OWASPLikelihoodEvaluation[0];
        delete likelihoodEvaluation.OWASPLikelihoodScore;
        const { ThreatFactor, ...rest } = likelihoodEvaluation;

        r.riskLikelihood = {
          riskIdRef: riskId,
          riskLikelihood,
          riskLikelihoodDetail: getHTMLString(xmlDataCopy, 'riskLikelihoodDetail', riskCounter.getCount()),
          ...ThreatFactor[0],
          ...rest,
        };
      } else {
        r.riskLikelihood = {
          riskIdRef: riskId,
          riskLikelihood,
          riskLikelihoodDetail: getHTMLString(xmlDataCopy, 'riskLikelihoodDetail', riskCounter.getCount()),
        };
      }

      // alter risk impact
      r.riskImpact = {
        riskIdRef: riskId,
        riskImpact,
        businessAssetPropertiesRef: businessAssetRef,
        ...BusinessAssetSelectedProperties[0],
      };

      // alter risk attack path
      if (VulnerabilityRiskEvaluation !== undefined) {
        const riskAttackPathIdCounter = counter();
        r.riskAttackPaths = VulnerabilityRiskEvaluation.map((attackPath) => {
          const { vulnerabilityRef, attackPathName, attackPathScore } = attackPath;
          riskAttackPathIdCounter.increment();
          const riskAttackPathId = riskAttackPathIdCounter.getCount();

          const vulnerabilityRefs = vulnerabilityRef.map((v) => {
            const obj = {};
            obj.vulnerabilityIdRef = v.char !== undefined ? v.char : '';
            obj.score = v.$.score;
            obj.name = v.$.name;
            return obj;
          });

          const newAttackPath = {
            riskIdRef: riskId,
            riskAttackPathId,
            attackPathName,
            attackPathScore,
            vulnerabilityRef: vulnerabilityRefs,
          };
          return newAttackPath;
        });
      } else r.riskAttackPaths = [];

      // alter risk mitigation
      if (Mitigation !== undefined) {
        const riskMitigationIdCounter = counter();
        r.riskMitigation = Mitigation.map((rm) => {
          riskMitigationCounter.increment();
          riskMitigationIdCounter.increment();
          const riskMitigationId = riskMitigationIdCounter.getCount();
          const {
            mitigationDecision, description, ...mitigation
          } = rm;

          const obj = {
            riskIdRef: riskId,
            riskMitigationId,
            description: getHTMLString(xmlDataCopy, 'description', riskMitigationCounter.getCount()),
            decisionDetail: getHTMLString(xmlDataCopy, 'decisionDetail', riskMitigationCounter.getCount()),
            decision: mitigationDecision[0].decision,
            ...mitigation,
            mitigationsBenefits,
            mitigationsDoneBenefits,
          };
          return obj;
        });
      } else r.riskMitigation = [];
    });
  }
  return risksCopy;
})(xmlData, risks);

module.exports = alterRisks;