const user = require('os').userInfo().username;

const date = new Date();
const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const ISRAProject = require('../../src/model/classes/ISRAProject/isra-project');
const ISRAMetaTracking = require('../../src/model/classes/ISRAProject/isra-meta-tracking');
const ISRAProjectContext = require('../../src/model/classes/ISRAProjectContext/isra-project-context');
const BusinessAsset = require('../../src/model/classes/BusinessAsset/business-asset');
const BusinessAssetProperties = require('../../src/model/classes/BusinessAsset/business-asset-properties');
const SupportingAsset = require('../../src/model/classes/SupportingAsset/supporting-asset');
const Risk = require('../../src/model/classes/Risk/risk');
const RiskName = require('../../src/model/classes/Risk/risk-name');
const RiskLikelihood = require('../../src/model/classes/Risk/risk-likelihood');
const RiskImpact = require('../../src/model/classes/Risk/risk-impact');
const RiskAttackPath = require('../../src/model/classes/Risk/risk-attack-path');
const RiskMitigation = require('../../src/model/classes/Risk/risk-mitigation');

describe('Populate class values (valid & invalid)', () => {
  const israProject = new ISRAProject();
  const israMetaTracking = new ISRAMetaTracking();
  const projectContext = new ISRAProjectContext();
  const businessAsset = new BusinessAsset();
  const businessAssetProperties = new BusinessAssetProperties();
  const supportingAsset = new SupportingAsset();
  const risk = new Risk();
  const riskName = new RiskName();
  const riskLikelihood = new RiskLikelihood();
  const riskImpact = new RiskImpact();
  const riskAttackPath = new RiskAttackPath();
  const riskMitigation = new RiskMitigation();

  // ISRA Project
  test('set projectName', () => {
    israProject.projectName = 'project name';
    expect(israProject.properties.ISRAmeta.projectName).toBe('project name');

    israProject.projectName = '';
    expect(israProject.properties.ISRAmeta.projectName).toBe('');

    expect(() => {
      israProject.projectName = 123;
    }).toThrow();
  });

  test('set projectOrganization', () => {
    const testValues = ['', 'AIS', 'BPS', 'CPL', 'IBS', 'ITE', 'MCS', 'Banking and Payment', 'Enterprise & Cybersecurity',
      'Government', 'Mobile Services & IoT', 'R&D Issuance Solutions & Services', 'SHD', 'Netsize', 'IDSS', 'Software House',
      'GGS', 'ICS', 'Coesys', 'eBanking', 'PSE'];

    testValues.forEach((testValue) => {
      israProject.projectOrganization = testValue;
      expect(israProject.properties.ISRAmeta.projectOrganization).toBe(testValue);
    });

    expect(() => {
      israProject.projectOrganization = 'Invalid project organization';
    }).toThrow();

    expect(() => {
      israProject.projectOrganization = 123;
    }).toThrow();
  });

  test('set projectVersion', () => {
    israProject.projectVersion = '1.01';
    expect(israProject.properties.ISRAmeta.projectVersion).toBe('1.01');

    israProject.projectVersion = '';
    expect(israProject.properties.ISRAmeta.projectVersion).toBe('');

    expect(() => {
      israProject.projectVersion = 1.01;
    }).toThrow();
  });

  test('get ISRAproject', () => {
    const proj = {
      ISRAmeta: {
        appVersion: undefined,
        projectName: '',
        projectOrganization: 'PSE',
        projectVersion: '',
        ISRAtracking: new Map(),
        businessAssetsCount: 0,
        supportingAssetsCount: 0,
        risksCount: 0,
        vulnerabilitiesCount: 0,
      },
      ProjectContext: {},
      BusinessAsset: new Map(),
      SupportingAssetsDesc: undefined,
      SupportingAsset: new Map(),
      Risk: new Map(),
      Vulnerability: new Map(),
    };

    expect(israProject.properties).toEqual(proj);
  });

  // set ISRA Meta Tracking
  test('set ISRAMetaTracking', () => {
    israProject.addMetaTracking(israMetaTracking);
    expect(israProject.properties.ISRAmeta.ISRAtracking
      .get(1).properties)
      .toEqual({
        trackingIteration: 1,
        trackingSecurityOfficer: user,
        trackingDate: currentDate,
        trackingComment: undefined,
      });

    expect(() => {
      israProject.addMetaTracking({});
    }).toThrow();
  });

  test('set trackingIteration', () => {
    israMetaTracking.trackingIteration = null;
    expect(israMetaTracking.properties.trackingIteration).toBe(null);

    israMetaTracking.trackingIteration = 1;
    expect(israMetaTracking.properties.trackingIteration).toBe(1);

    expect(() => {
      israMetaTracking.trackingIteration = '1';
    }).toThrow();

    expect(() => {
      israMetaTracking.trackingIteration = 0;
    }).toThrow();

    expect(() => {
      israMetaTracking.trackingIteration = 1.1;
    }).toThrow();
  });

  test('set trackingSecurityOfficer', () => {
    israMetaTracking.trackingSecurityOfficer = 'officer name 1';
    expect(israMetaTracking.properties.trackingSecurityOfficer).toBe('officer name 1');

    israMetaTracking.trackingSecurityOfficer = '';
    expect(israMetaTracking.properties.trackingSecurityOfficer).toBe('');

    expect(() => {
      israMetaTracking.trackingSecurityOfficer = 123;
    }).toThrow();
  });

  test('set trackingDate', () => {
    israMetaTracking.trackingDate = '2022-04-08';
    expect(israMetaTracking.properties.trackingDate).toBe('2022-04-08');

    israMetaTracking.trackingDate = '';
    expect(israMetaTracking.properties.trackingDate).toBe('');

    expect(() => {
      israMetaTracking.trackingDate = '2022-01-123';
    }).toThrow();

    expect(() => {
      israMetaTracking.trackingDate = 'string';
    }).toThrow();

    expect(() => {
      israMetaTracking.trackingDate = 123;
    }).toThrow();
  });

  test('set trackingComment', () => {
    israMetaTracking.trackingComment = '';
    expect(israMetaTracking.properties.trackingComment).toBe('');

    israMetaTracking.trackingComment = 'comment';
    expect(israMetaTracking.properties.trackingComment).toBe('comment');

    expect(() => {
      israMetaTracking.trackingComment = 123;
    }).toThrow();
  });

  // get ISRA Meta Tracking
  test('get ISRAMetaTracking', () => {
    const tracking = {
      trackingIteration: 1,
      trackingSecurityOfficer: '',
      trackingDate: '',
      trackingComment: 'comment',
    };

    expect(israProject.properties.ISRAmeta.ISRAtracking.get(1).properties).toEqual(tracking);
  });

  // set ISRA Project Context
  test('set projectContext', () => {
    israProject.projectContext = projectContext;
    expect(israProject.projectContext.properties)
      .toEqual({
        projectDescription: undefined,
        projectURL: undefined,
        projectDescriptionAttachment: undefined,
        securityProjectObjectives: undefined,
        securityOfficerObjectives: undefined,
        securityAssumptions: undefined,
      });

    expect(() => {
      israProject.israProjectContext = {
        projectDescription: '',
        projectURL: '',
        projectDescriptionAttachment: '',
        securityProjectObjectives: '',
        securityOfficerObjectives: '',
        securityAssumptions: '',
      };
    }).toThrow(/not an instance/);
  });

  test('set projectDescription', () => {
    projectContext.projectDescription = '<p style="color:blue>project description</p>';
    expect(projectContext.properties.projectDescription).toBe('<p style="color:blue>project description</p>');

    projectContext.projectDescription = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(projectContext.properties.projectDescription).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    projectContext.projectDescription = '';
    expect(projectContext.properties.projectDescription).toBe('');

    expect(() => {
      projectContext.projectDescription = 'project description';
    }).toThrow();

    expect(() => {
      projectContext.projectDescription = 123;
    }).toThrow();
  });

  test('set projectURL', () => {
    projectContext.projectURL = 'https://www.google.com';
    expect(projectContext.properties.projectURL).toBe('https://www.google.com');

    projectContext.projectURL = 'ftp://server/pathname';
    expect(projectContext.properties.projectURL).toBe('ftp://server/pathname');

    projectContext.projectURL = 'mailto:username@thalesgroup.com';
    expect(projectContext.properties.projectURL).toBe('mailto:username@thalesgroup.com');

    projectContext.projectURL = '';
    expect(projectContext.properties.projectURL).toBe('');

    expect(() => {
      projectContext.projectURL = 'https://';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'http://';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'ftp://';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'mailto:';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'ftp://server/';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'www.google.com';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'ftp://';
    }).toThrow();

    expect(() => {
      projectContext.projectURL = 'mailto:invalidEmail';
    }).toThrow();
  });

  test('set projectDescriptionAttachment', () => {
    projectContext.projectDescriptionAttachment = 'YWJjZA==';
    expect(projectContext.properties.projectDescriptionAttachment).toBe('YWJjZA==');

    projectContext.projectDescriptionAttachment = '';
    expect(projectContext.properties.projectDescriptionAttachment).toBe('');

    expect(() => {
      projectContext.projectDescriptionAttachment = 123;
    }).toThrow();

    expect(() => {
      projectContext.projectDescriptionAttachment = 'nkjh8whNknj';
    }).toThrow();
  });

  test('set securityProjectObjectives', () => {
    projectContext.securityProjectObjectives = '<p style="color:blue>project description</p>';
    expect(projectContext.properties.securityProjectObjectives).toBe('<p style="color:blue>project description</p>');

    projectContext.securityProjectObjectives = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(projectContext.properties.securityProjectObjectives).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    projectContext.securityProjectObjectives = '';
    expect(projectContext.properties.securityProjectObjectives).toBe('');

    expect(() => {
      projectContext.securityProjectObjectives = 'project objectives';
    }).toThrow();

    expect(() => {
      projectContext.securityProjectObjectives = 123;
    }).toThrow();
  });

  test('set securityOfficerObjectives', () => {
    projectContext.securityOfficerObjectives = '<p style="color:blue>project description</p>';
    expect(projectContext.properties.securityOfficerObjectives).toBe('<p style="color:blue>project description</p>');

    projectContext.securityOfficerObjectives = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(projectContext.properties.securityOfficerObjectives).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    projectContext.securityOfficerObjectives = '';
    expect(projectContext.properties.securityOfficerObjectives).toBe('');

    expect(() => {
      projectContext.securityOfficerObjectives = 'security officer objectives';
    }).toThrow();

    expect(() => {
      projectContext.securityOfficerObjectives = 123;
    }).toThrow();
  });

  test('set securityAssumptions', () => {
    projectContext.securityAssumptions = '<p style="color:blue>project description</p>';
    expect(projectContext.properties.securityAssumptions).toBe('<p style="color:blue>project description</p>');

    projectContext.securityAssumptions = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(projectContext.properties.securityAssumptions).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    projectContext.securityAssumptions = '';
    expect(projectContext.properties.securityAssumptions).toBe('');

    expect(() => {
      projectContext.securityAssumptions = 'security assumptions';
    }).toThrow();

    expect(() => {
      projectContext.securityAssumptions = 123;
    }).toThrow();
  });

  // get Project Context
  test('get projectContext', () => {
    const projcxt = {
      projectDescription: '',
      projectURL: '',
      projectDescriptionAttachment: '',
      securityProjectObjectives: '',
      securityOfficerObjectives: '',
      securityAssumptions: '',
    };

    expect(israProject.projectContext.properties).toEqual(projcxt);
  });

  // set Business Asset
  test('set BusinessAsset', () => {
    israProject.addBusinessAsset(businessAsset);
    expect(israProject.properties.BusinessAsset.get(1).properties).toEqual({
      businessAssetId: 1,
      businessAssetName: undefined,
      businessAssetType: undefined,
      businessAssetDescription: undefined,
      businessAssetProperties: undefined,
    });

    expect(() => {
      israProject.addBusinessAsset({});
    }).toThrow();
  });

  test('set businessAssetId', () => {
    businessAsset.businessAssetId = null;
    expect(businessAsset.properties.businessAssetId).toBe(null);

    businessAsset.businessAssetId = 1;
    expect(businessAsset.properties.businessAssetId).toBe(1);

    expect(() => {
      businessAsset.businessAssetId = '1';
    }).toThrow();

    expect(() => {
      businessAsset.businessAssetId = 0;
    }).toThrow();

    expect(() => {
      businessAsset.businessAssetId = 1.1;
    }).toThrow();
  });

  test('set businessAssetName', () => {
    businessAsset.businessAssetName = 'name';
    expect(businessAsset.properties.businessAssetName).toBe('name');

    businessAsset.businessAssetName = '';
    expect(businessAsset.properties.businessAssetName).toBe('');

    expect(() => {
      businessAsset.businessAssetName = 123;
    }).toThrow();
  });

  test('set businessAssetType', () => {
    const testValues = ['', 'Data', 'Service'];
    testValues.forEach((testValue) => {
      businessAsset.businessAssetType = testValue;
      expect(businessAsset.properties.businessAssetType).toBe(testValue);
    });

    expect(() => {
      businessAsset.businessAssetType = 'Invalid type';
    }).toThrow();

    expect(() => {
      businessAsset.businessAssetType = 123;
    }).toThrow();
  });

  test('set businessAssetDescription', () => {
    businessAsset.businessAssetDescription = '<p style="color:blue>project description</p>';
    expect(businessAsset.properties.businessAssetDescription).toBe('<p style="color:blue>project description</p>');

    businessAsset.businessAssetDescription = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(businessAsset.properties.businessAssetDescription).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    businessAsset.businessAssetDescription = '';
    expect(businessAsset.properties.businessAssetDescription).toBe('');

    expect(() => {
      businessAsset.businessAssetDescription = 'description';
    }).toThrow();

    expect(() => {
      businessAsset.businessAssetDescription = 123;
    }).toThrow();
  });

  test('set businessAssetProperties', () => {
    businessAsset.businessAssetProperties = businessAssetProperties;
    businessAsset.properties
      .businessAssetProperties.businessAssetIdRef = businessAsset.properties.businessAssetId;

    expect(businessAsset.properties.businessAssetProperties.properties).toEqual({
      businessAssetIdRef: 1,
      businessAssetAuthenticity: undefined,
      businessAssetAuthorization: undefined,
      businessAssetAvailability: undefined,
      businessAssetConfidentiality: undefined,
      businessAssetIntegrity: undefined,
      businessAssetNonRepudiation: undefined,
    });
    expect(() => {
      businessAsset.businessAssetProperties = {};
    }).toThrow();
  });

  // set Business Asset Properties
  test('set businessAssetIdRef', () => {
    businessAssetProperties.businessAssetIdRef = null;
    expect(businessAsset.properties
      .businessAssetProperties.properties.businessAssetIdRef).toBe(null);

    businessAssetProperties.businessAssetIdRef = 1;
    expect(businessAsset.properties
      .businessAssetProperties.properties.businessAssetIdRef).toBe(1);

    expect(() => {
      businessAssetProperties.businessAssetIdRef = 0;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetIdRef = '1';
    }).toThrow();
  });

  test('set businessAssetConfidentiality', () => {
    const testValues = [null, 0, 1, 2, 3, 4];
    testValues.forEach((testValue) => {
      businessAssetProperties.businessAssetConfidentiality = testValue;
      expect(businessAssetProperties.properties.businessAssetConfidentiality).toBe(testValue);
    });

    expect(() => {
      businessAssetProperties.businessAssetConfidentiality = -1;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetConfidentiality = 5;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetConfidentiality = '2';
    }).toThrow();
  });

  test('set businessAssetIntegrity', () => {
    const testValues = [null, 0, 1, 2, 3, 4];
    testValues.forEach((testValue) => {
      businessAssetProperties.businessAssetIntegrity = testValue;
      expect(businessAssetProperties.properties.businessAssetIntegrity).toBe(testValue);
    });

    expect(() => {
      businessAssetProperties.businessAssetIntegrity = -1;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetIntegrity = 5;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetIntegrity = '2';
    }).toThrow();
  });

  test('set businessAssetAvailability', () => {
    const testValues = [null, 0, 1, 2, 3, 4];
    testValues.forEach((testValue) => {
      businessAssetProperties.businessAssetAvailability = testValue;
      expect(businessAssetProperties.properties.businessAssetAvailability).toBe(testValue);
    });

    expect(() => {
      businessAssetProperties.businessAssetAvailability = -1;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetAvailability = 5;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetAvailability = '2';
    }).toThrow();
  });

  test('set businessAssetAuthenticity', () => {
    const testValues = [null, 0, 1, 2, 3, 4];
    testValues.forEach((testValue) => {
      businessAssetProperties.businessAssetAuthenticity = testValue;
      expect(businessAssetProperties.properties.businessAssetAuthenticity).toBe(testValue);
    });

    expect(() => {
      businessAssetProperties.businessAssetAuthenticity = -1;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetAuthenticity = 5;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetAuthenticity = '2';
    }).toThrow();
  });

  test('set businessAssetAuthorization', () => {
    const testValues = [null, 0, 1, 2, 3, 4];
    testValues.forEach((testValue) => {
      businessAssetProperties.businessAssetAuthorization = testValue;
      expect(businessAssetProperties.properties.businessAssetAuthorization).toBe(testValue);
    });

    expect(() => {
      businessAssetProperties.businessAssetAuthorization = -1;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetAuthorization = 5;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetAuthorization = '2';
    }).toThrow();
  });

  test('set businessAssetNonRepudiation', () => {
    const testValues = [null, 0, 1, 2, 3, 4];
    testValues.forEach((testValue) => {
      businessAssetProperties.businessAssetNonRepudiation = testValue;
      expect(businessAssetProperties.properties.businessAssetNonRepudiation).toBe(testValue);
    });

    expect(() => {
      businessAssetProperties.businessAssetNonRepudiation = -1;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetNonRepudiation = 5;
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetNonRepudiation = '2';
    }).toThrow();

    expect(() => {
      businessAssetProperties.businessAssetNonRepudiation = 1.1;
    }).toThrow();
  });

  // get Business Asset and Business Asset Properties
  test('get businessAsset', () => {
    const ba = {
      businessAssetId: 1,
      businessAssetName: '',
      businessAssetType: 'Service',
      businessAssetDescription: '',
      businessAssetProperties: expect.any(BusinessAssetProperties),
    };

    const bap = {
      businessAssetIdRef: 1,
      businessAssetAuthenticity: 4,
      businessAssetAuthorization: 4,
      businessAssetAvailability: 4,
      businessAssetConfidentiality: 4,
      businessAssetIntegrity: 4,
      businessAssetNonRepudiation: 4,
    };

    expect(israProject.properties.BusinessAsset.get(1).properties)
      .toEqual(expect.objectContaining(ba));
    expect(israProject.properties.BusinessAsset.get(1).properties
      .businessAssetProperties.properties).toEqual(bap);
  });

  // set and get Supporting Asset Desc
  test('set supportingAssetsDesc', () => {
    israProject.supportingAssetsDesc = '<p style="color:blue>project description</p>';
    expect(israProject.properties.SupportingAssetsDesc).toBe('<p style="color:blue>project description</p>');

    israProject.supportingAssetsDesc = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(israProject.properties.SupportingAssetsDesc).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    israProject.supportingAssetsDesc = '';
    expect(israProject.properties.SupportingAssetsDesc).toBe('');

    expect(() => {
      israProject.supportingAssetsDesc = 'description';
    }).toThrow();

    expect(() => {
      israProject.supportingAssetsDesc = 123;
    }).toThrow();
  });

  // set Supporting Asset
  test('set SupportingAsset', () => {
    israProject.addSupportingAsset(supportingAsset);
    expect(israProject.properties.SupportingAsset.get(1).properties).toEqual({
      supportingAssetId: 1,
      supportingAssetHLDId: undefined,
      supportingAssetName: undefined,
      supportingAssetType: undefined,
      supportingAssetSecurityLevel: undefined,
      businessAssetRefs: new Set([]),
    });

    expect(() => {
      israProject.addSupportingAsset({});
    }).toThrow();
  });

  test('set supportingAssetId', () => {
    supportingAsset.supportingAssetId = null;
    expect(supportingAsset.properties.supportingAssetId).toBe(null);

    supportingAsset.supportingAssetId = 1;
    expect(supportingAsset.properties.supportingAssetId).toBe(1);

    expect(() => {
      supportingAsset.supportingAssetId = '1';
    }).toThrow();

    expect(() => {
      supportingAsset.supportingAssetId = 0;
    }).toThrow();

    expect(() => {
      supportingAsset.supportingAssetId = 1.1;
    }).toThrow();
  });

  test('set supportingAssetHLDId', () => {
    supportingAsset.supportingAssetHLDId = '1';
    expect(supportingAsset.properties.supportingAssetHLDId).toBe('1');

    supportingAsset.supportingAssetHLDId = '';
    expect(supportingAsset.properties.supportingAssetHLDId).toBe('');

    expect(() => {
      supportingAsset.supportingAssetHLDId = 1;
    }).toThrow();
  });

  test('set supportingAssetName', () => {
    supportingAsset.supportingAssetName = 'name';
    expect(supportingAsset.properties.supportingAssetName).toBe('name');

    supportingAsset.supportingAssetName = '';
    expect(supportingAsset.properties.supportingAssetName).toBe('');

    expect(() => {
      supportingAsset.supportingAssetName = 123;
    }).toThrow();
  });

  test('set supportingAssetType', () => {
    const testValues = ['', 'Database', 'Operating System', 'Application Server', 'Application module', 'File', 'Log', 'Web Service',
      'Web User Interface', 'Remote API', 'Local API', 'Crypto-Key', 'Software application', 'Service Provider', 'Hardware device',
      'Computer', 'Human', 'Network', 'Server', 'Source code', 'Organization', 'Location', 'Process', 'Interface'];

    testValues.forEach((testValue) => {
      supportingAsset.supportingAssetType = testValue;
      expect(supportingAsset.properties.supportingAssetType).toBe(testValue);
    });

    expect(() => {
      supportingAsset.supportingAssetType = 'Invalid type';
    }).toThrow();

    expect(() => {
      supportingAsset.supportingAssetType = 123;
    }).toThrow();
  });

  test('set supportingAssetSecurityLevel', () => {
    const testValues = [null, -2, -1, 0, 1, 2];
    testValues.forEach((testValue) => {
      supportingAsset.supportingAssetSecurityLevel = testValue;
      expect(supportingAsset.properties.supportingAssetSecurityLevel).toBe(testValue);
    });

    expect(() => {
      supportingAsset.supportingAssetSecurityLevel = -3;
    }).toThrow();

    expect(() => {
      supportingAsset.supportingAssetSecurityLevel = 3;
    }).toThrow();

    expect(() => {
      supportingAsset.supportingAssetSecurityLevel = '2';
    }).toThrow();

    expect(() => {
      supportingAsset.supportingAssetSecurityLevel = 1.1;
    }).toThrow();
  });

  test('set businessAssetRef', () => {
    supportingAsset.addBusinessAssetRef(1);
    expect(supportingAsset.properties.businessAssetRefs.has(1)).toBe(true);

    expect(() => {
      supportingAsset.addBusinessAssetRef('1');
    }).toThrow();
  });

  // get Supporting Asset
  test('get supportingAsset', () => {
    const sa = {
      supportingAssetId: 1,
      supportingAssetHLDId: '',
      supportingAssetName: '',
      supportingAssetType: 'Interface',
      supportingAssetSecurityLevel: 2,
      businessAssetRefs: new Set([1]),
    };

    expect(israProject.properties.SupportingAsset.get(1).properties).toEqual(sa);
  });

  // set Risk
  test('set Risk', () => {
    israProject.addRisk(risk);
    expect(israProject.properties.Risk.get(1).properties).toEqual({
      riskId: 1,
      projectNameRef: undefined,
      projectVersionRef: undefined,
      riskName: undefined,
      riskLikelihood: undefined,
      riskImpact: undefined,
      riskAttackPaths: new Map(),
      allAttackPathsName: undefined,
      allAttackPathsScore: undefined,
      inherentRiskScore: undefined,
      riskMitigation: new Map(),
      mitigatedRiskScore: undefined,
      riskManagementDecision: undefined,
      riskManagementDetail: undefined,
      residualRiskScore: undefined,
      residualRiskLevel: undefined,
    });

    expect(() => {
      israProject.addRisk({});
    }).toThrow();
  });

  test('set riskId', () => {
    risk.riskId = null;
    expect(risk.properties.riskId).toBe(null);

    risk.riskId = 1;
    expect(risk.properties.riskId).toBe(1);

    expect(() => {
      risk.riskId = '1';
    }).toThrow();

    expect(() => {
      risk.riskId = 0;
    }).toThrow();

    expect(() => {
      risk.riskId = 1.1;
    }).toThrow();
  });

  test('set projectNameRef', () => {
    risk.projectNameRef = 'name';
    expect(risk.properties.projectNameRef).toBe('name');

    risk.projectNameRef = '';
    expect(risk.properties.projectNameRef).toBe('');

    expect(() => {
      risk.projectNameRef = 123;
    }).toThrow();
  });

  test('set projectVersionRef', () => {
    risk.projectNameRef = 'version';
    expect(risk.properties.projectNameRef).toBe('version');

    risk.projectNameRef = '';
    expect(risk.properties.projectNameRef).toBe('');

    expect(() => {
      risk.projectVersionRef = 123;
    }).toThrow();
  });

  test('set allAttackPathsName', () => {
    risk.allAttackPathsName = 'pathsName';
    expect(risk.properties.allAttackPathsName).toBe('pathsName');

    risk.allAttackPathsName = '';
    expect(risk.properties.allAttackPathsName).toBe('');

    expect(() => {
      risk.allAttackPathsName = 123;
    }).toThrow();
  });

  test('set allAttackPathsScore', () => {
    risk.allAttackPathsScore = 10;
    expect(risk.properties.allAttackPathsScore).toBe(10);

    risk.allAttackPathsScore = 0;
    expect(risk.properties.allAttackPathsScore).toBe(0);

    expect(() => {
      risk.allAttackPathsScore = 10.1;
    }).toThrow();

    expect(() => {
      risk.allAttackPathsScore = -0.1;
    }).toThrow();

    expect(() => {
      risk.allAttackPathsScore = '5.5';
    }).toThrow();

    expect(() => {
      risk.allAttackPathsScore = NaN;
    }).toThrow();
  });

  test('set inherentRiskScore', () => {
    risk.inherentRiskScore = 0;
    expect(risk.properties.inherentRiskScore).toBe(0);

    expect(() => {
      risk.inherentRiskScore = -1;
    }).toThrow();

    expect(() => {
      risk.inherentRiskScore = '1';
    }).toThrow();

    expect(() => {
      risk.inherentRiskScore = NaN;
    }).toThrow();
  });

  // set Risk Name
  test('set riskName', () => {
    risk.riskName = riskName;
    risk.properties.riskName.riskIdRef = risk.properties.riskId;
    expect(risk.properties.riskName.properties).toEqual({
      riskIdRef: 1,
      riskName: undefined,
      threatAgent: undefined,
      threatAgentDetail: undefined,
      threatVerb: undefined,
      threatVerbDetail: undefined,
      motivation: undefined,
      motivationDetail: undefined,
      businessAssetRef: undefined,
      supportingAssetRef: undefined,
    });

    expect(() => {
      risk.riskName = {};
    }).toThrow();
  });

  test('set riskIdRef', () => {
    riskName.riskIdRef = null;
    expect(riskName.properties.riskIdRef).toBe(null);

    riskName.riskIdRef = 1;
    expect(riskName.properties.riskIdRef).toBe(1);

    expect(() => {
      riskName.riskIdRef = '1';
    }).toThrow();
  });

  test('set riskName', () => {
    riskName.riskName = 'name';
    expect(riskName.properties.riskName).toBe('name');

    riskName.riskName = '';
    expect(riskName.properties.riskName).toBe('');

    expect(() => {
      riskName.riskName = 123;
    }).toThrow();
  });

  test('set threatAgent', () => {
    const testValues = ['', 'Insider', 'Criminal', 'Competitor', 'Criminal organization', 'Government agency', 'Researcher', 'Activist',
      'Script Kiddy', 'User', 'R&D Employee', 'Operationnal Employee', 'Maintenance Employee', 'IT Employee'];

    testValues.forEach((testValue) => {
      riskName.threatAgent = testValue;
      expect(riskName.properties.threatAgent).toBe(testValue);
    });

    expect(() => {
      riskName.threatAgent = 'Invalid agent';
    }).toThrow();

    expect(() => {
      riskName.threatAgent = 123;
    }).toThrow();
  });

  test('set threatAgentDetail', () => {
    riskName.threatAgentDetail = '<p style="color:blue>project description</p>';
    expect(riskName.properties.threatAgentDetail).toBe('<p style="color:blue>project description</p>');

    riskName.threatAgentDetail = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(riskName.properties.threatAgentDetail).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    riskName.threatAgentDetail = '';
    expect(riskName.properties.threatAgentDetail).toBe('');

    expect(() => {
      riskName.threatAgentDetail = 'detail';
    }).toThrow();

    expect(() => {
      riskName.threatAgentDetail = 123;
    }).toThrow();
  });

  test('set threatVerb', () => {
    const testValues = ['', 'lose', 'spoof', 'tamper with', 'repudiate', 'disclose', 'steal', 'deny access to',
      'gain an unauthorized access to', 'flood'];

    testValues.forEach((testValue) => {
      riskName.threatVerb = testValue;
      expect(riskName.properties.threatVerb).toBe(testValue);
    });

    expect(() => {
      riskName.threatVerb = 'Invalid verb';
    }).toThrow();

    expect(() => {
      riskName.threatVerb = 123;
    }).toThrow();
  });

  test('set threatVerbDetail', () => {
    riskName.threatVerbDetail = '<p style="color:blue>project description</p>';
    expect(riskName.properties.threatVerbDetail).toBe('<p style="color:blue>project description</p>');

    riskName.threatVerbDetail = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(riskName.properties.threatVerbDetail).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    riskName.threatVerbDetail = '';
    expect(riskName.properties.threatVerbDetail).toBe('');

    expect(() => {
      riskName.threatVerbDetail = 'detail';
    }).toThrow();

    expect(() => {
      riskName.threatVerbDetail = 123;
    }).toThrow();
  });

  test('set motivation', () => {
    riskName.motivation = 'motivation';
    expect(riskName.properties.motivation).toBe('motivation');

    riskName.motivation = '';
    expect(riskName.properties.motivation).toBe('');

    expect(() => {
      riskName.motivation = 123;
    }).toThrow();
  });

  test('set motivationDetail', () => {
    riskName.motivationDetail = '<p style="color:blue>project description</p>';
    expect(riskName.properties.motivationDetail).toBe('<p style="color:blue>project description</p>');

    riskName.motivationDetail = '<img src="pic_trulli.jpg" alt="Italian Trulli/">';
    expect(riskName.properties.motivationDetail).toBe('<img src="pic_trulli.jpg" alt="Italian Trulli/">');

    riskName.motivationDetail = '';
    expect(riskName.properties.motivationDetail).toBe('');

    expect(() => {
      riskName.motivationDetail = 'detail';
    }).toThrow();

    expect(() => {
      riskName.motivationDetail = 123;
    }).toThrow();
  });

  test('set businessAssetRef', () => {
    riskName.businessAssetRef = null;
    expect(riskName.properties.businessAssetRef).toBe(null);

    riskName.businessAssetRef = businessAsset.properties.businessAssetId;
    expect(riskName.properties.businessAssetRef).toBe(1);

    expect(() => {
      riskName.businessAssetRef = '1';
    }).toThrow();
  });

  test('set supportingAssetRef', () => {
    riskName.supportingAssetRef = null;
    expect(riskName.properties.supportingAssetRef).toBe(null);

    riskName.supportingAssetRef = supportingAsset.properties.supportingAssetId;
    expect(riskName.properties.supportingAssetRef).toBe(1);

    expect(() => {
      riskName.supportingAssetRef = '1';
    }).toThrow();
  });

  // Risk Likelihood
  test('set riskLikelihood', () => {
    risk.riskLikelihood = riskLikelihood;
    risk.properties.riskLikelihood.riskIdRef = risk.properties.riskId;

    expect(risk.properties.riskLikelihood.properties).toEqual({
      riskIdRef: 1,
      riskLikelihood: undefined,
      riskLikelihoodDetail: undefined,
      skillLevel: undefined,
      reward: undefined,
      accessResources: undefined,
      size: undefined,
      intrusionDetection: undefined,
      threatFactorScore: undefined,
      threatFactorLevel: undefined,
      occurrence: undefined,
      occurrenceLevel: undefined,
    });

    expect(() => {
      risk.riskLikelihood = {};
    }).toThrow();
  });

  test('set riskIdRef', () => {
    riskLikelihood.riskIdRef = null;
    expect(riskLikelihood.properties.riskIdRef).toBe(null);

    riskLikelihood.riskIdRef = 1;
    expect(riskLikelihood.properties.riskIdRef).toBe(1);

    expect(() => {
      riskLikelihood.riskIdRef = '1';
    }).toThrow();
  });

  test('set riskLikelihood', () => {
    expect(() => {
      riskLikelihood.riskLikelihood = 0;
    }).toThrow();

    expect(() => {
      riskLikelihood.riskLikelihood = 2.4;
    }).toThrow();

    expect(() => {
      riskLikelihood.riskLikelihood = 5;
    }).toThrow();

    expect(() => {
      riskLikelihood.riskLikelihood = 'string';
    }).toThrow();
  });

  test('set riskLikelihoodDetail', () => {
    expect(() => {
      riskLikelihood.riskLikelihoodDetail = 123;
    }).toThrow();
  });

  test('set skillLevel', () => {
    expect(() => {
      riskLikelihood.skillLevel = 0;
    }).toThrow();

    expect(() => {
      riskLikelihood.skillLevel = 2;
    }).toThrow();

    expect(() => {
      riskLikelihood.skillLevel = 10;
    }).toThrow();

    expect(() => {
      riskLikelihood.skillLevel = 'string';
    }).toThrow();
  });

  test('set reward', () => {
    expect(() => {
      riskLikelihood.reward = 0;
    }).toThrow();

    expect(() => {
      riskLikelihood.reward = 2;
    }).toThrow();

    expect(() => {
      riskLikelihood.reward = 10;
    }).toThrow();

    expect(() => {
      riskLikelihood.reward = 'string';
    }).toThrow();
  });

  test('set accessResources', () => {
    expect(() => {
      riskLikelihood.accessResources = 1;
    }).toThrow();

    expect(() => {
      riskLikelihood.accessResources = 6;
    }).toThrow();

    expect(() => {
      riskLikelihood.accessResources = 10;
    }).toThrow();

    expect(() => {
      riskLikelihood.accessResources = 'string';
    }).toThrow();
  });

  test('set size', () => {
    expect(() => {
      riskLikelihood.size = 1;
    }).toThrow();

    expect(() => {
      riskLikelihood.size = 7;
    }).toThrow();

    expect(() => {
      riskLikelihood.size = 10;
    }).toThrow();

    expect(() => {
      riskLikelihood.size = 'string';
    }).toThrow();
  });

  test('set intrusionDetection', () => {
    expect(() => {
      riskLikelihood.intrusionDetection = 0;
    }).toThrow();

    expect(() => {
      riskLikelihood.intrusionDetection = 5;
    }).toThrow();

    expect(() => {
      riskLikelihood.intrusionDetection = 10;
    }).toThrow();

    expect(() => {
      riskLikelihood.intrusionDetection = 'string';
    }).toThrow();
  });

  test('set threatFactorScore', () => {
    riskLikelihood.threatFactorScore = 11;
    expect(riskLikelihood.properties.threatFactorScore).toBe(11);

    riskLikelihood.threatFactorScore = 5.8;
    expect(riskLikelihood.properties.threatFactorScore).toBe(5.8);

    expect(() => {
      riskLikelihood.threatFactorScore = 'string';
    }).toThrow();
  });

  test('set threatFactorLevel', () => {
    expect(() => {
      riskLikelihood.threatFactorLevel = 'Invalid level';
    }).toThrow();

    expect(() => {
      riskLikelihood.threatFactorLevel = 123;
    }).toThrow();
  });

  test('set occurrence', () => {
    expect(() => {
      riskLikelihood.occurrence = 0;
    }).toThrow();

    expect(() => {
      riskLikelihood.occurrence = 6;
    }).toThrow();

    expect(() => {
      riskLikelihood.occurrence = 10;
    }).toThrow();

    expect(() => {
      riskLikelihood.occurrence = 'string';
    }).toThrow();
  });

  test('set occurrenceLevel', () => {
    expect(() => {
      riskLikelihood.occurrenceLevel = 'Invalid level';
    }).toThrow();

    expect(() => {
      riskLikelihood.occurrenceLevel = 123;
    }).toThrow();
  });

  // Risk Impact
  test('set riskImpact', () => {
    expect(() => {
      risk.riskImpact = {};
    }).toThrow();
  });

  test('set riskIdRef', () => {
    expect(() => {
      riskImpact.riskIdRef = '1';
    }).toThrow();
  });

  test('set riskImpact', () => {
    expect(() => {
      riskImpact.riskImpact = '1';
    }).toThrow();
  });

  test('set businessAssetConfidentialityFlag', () => {
    expect(() => {
      riskImpact.businessAssetConfidentialityFlag = 2;
    }).toThrow();

    expect(() => {
      riskImpact.businessAssetConfidentialityFlag = 'string';
    }).toThrow();
  });

  test('set businessAssetIntegrityFlag', () => {
    expect(() => {
      riskImpact.businessAssetIntegrityFlag = 2;
    }).toThrow();

    expect(() => {
      riskImpact.businessAssetIntegrityFlag = 'string';
    }).toThrow();
  });

  test('set businessAssetAvailabilityFlag', () => {
    expect(() => {
      riskImpact.businessAssetAvailabilityFlag = 2;
    }).toThrow();

    expect(() => {
      riskImpact.businessAssetAvailabilityFlag = 'string';
    }).toThrow();
  });

  test('set businessAssetAuthenticityFlag', () => {
    expect(() => {
      riskImpact.businessAssetAuthenticityFlag = 2;
    }).toThrow();

    expect(() => {
      riskImpact.businessAssetAuthenticityFlag = 'string';
    }).toThrow();
  });

  test('set businessAssetAuthorizationFlag', () => {
    expect(() => {
      riskImpact.businessAssetAuthorizationFlag = 2;
    }).toThrow();

    expect(() => {
      riskImpact.businessAssetAuthorizationFlag = 'string';
    }).toThrow();
  });

  test('set businessAssetNonRepudiationFlag', () => {
    expect(() => {
      riskImpact.businessAssetNonRepudiationFlag = 2;
    }).toThrow();

    expect(() => {
      riskImpact.businessAssetNonRepudiationFlag = 'string';
    }).toThrow();
  });

  // Risk attack path
  test('set riskAttackPaths', () => {
    expect(() => {
      risk.addRiskAttackPath({});
    }).toThrow();
  });

  test('set riskIdRef', () => {
    expect(() => {
      riskAttackPath.riskIdRef = '1';
    }).toThrow();
  });

  test('set riskAttackPathId', () => {
    expect(() => {
      riskAttackPath.riskAttackPathId = '1';
    }).toThrow();
  });

  test('set vulnerabilityRef', () => {
    expect(() => {
      riskAttackPath.addVulnerability({});
    }).toThrow();
  });

  test('set attackPathName', () => {
    expect(() => {
      riskAttackPath.attackPathName = 123;
    }).toThrow();
  });

  test('set attackPathScore', () => {
    expect(() => {
      riskAttackPath.attackPathScore = -0.1;
    }).toThrow();

    expect(() => {
      riskAttackPath.attackPathScore = 10.1;
    }).toThrow();

    expect(() => {
      riskAttackPath.attackPathScore = 'string';
    }).toThrow();
  });

  test('set inherentRiskScore', () => {
    expect(() => {
      risk.inherentRiskScore = -0.1;
    }).toThrow();

    expect(() => {
      risk.inherentRiskScore = 'string';
    }).toThrow();
  });

  // Risk mitigation
  test('set riskMitigation', () => {
    expect(() => {
      risk.addRiskMitigation({});
    }).toThrow();
  });

  test('set riskIdRef', () => {
    expect(() => {
      riskMitigation.riskIdRef = '1';
    }).toThrow();
  });

  test('set riskMitigationId', () => {
    expect(() => {
      riskMitigation.riskMitigationId = '1';
    }).toThrow();
  });

  test('set benefits', () => {
    riskMitigation.benefits = null;
    expect(riskMitigation.properties.benefits).toBe(null);

    expect(() => {
      riskMitigation.benefits = 'null';
    }).toThrow();

    expect(() => {
      riskMitigation.benefits = '0';
    }).toThrow();

    expect(() => {
      riskMitigation.benefits = 'string';
    }).toThrow();

    expect(() => {
      riskMitigation.benefits = -0.1;
    }).toThrow();

    expect(() => {
      riskMitigation.benefits = 0.2;
    }).toThrow();

    expect(() => {
      riskMitigation.benefits = 1.1;
    }).toThrow();
  });

  test('set cost', () => {
    expect(() => {
      riskMitigation.cost = 10.1;
    }).toThrow();

    expect(() => {
      riskMitigation.cost = '10';
    }).toThrow();
  });

  test('set decision', () => {
    expect(() => {
      riskMitigation.decision = 'Invalid decision';
    }).toThrow();

    expect(() => {
      riskMitigation.decision = 123;
    }).toThrow();
  });
});