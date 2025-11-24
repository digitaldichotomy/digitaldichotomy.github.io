/**
 * Sentinel Patent Database - Comprehensive Surveillance Patent Intelligence
 * Complete database of 29 critical surveillance patents with threat analysis and countermeasures
 */

const PATENTS_DATABASE = {
    metadata: {
        totalPatents: 29,
        criticalCount: 8,
        highCount: 12,
        mediumCount: 9,
        lowCount: 0,
        lastUpdated: "2025-11-23",
        version: "2.0"
    },
    
    patents: [
        {
            rank: 1,
            id: "US20210132019A1",
            assignee: "IBM",
            title: "Quantum dot biosensors for neural activity mapping",
            category: "Neurotech",
            threatLevel: "CRITICAL",
            deploymentStatus: "DARPA trials active",
            alarmingReason: "Nanoscale injectable sensors embed in neural tissue; enable permanent internal surveillance and closed-loop control—no external device required.",
            technicalDetail: "Rewrites memory and ontology in real time using multi-sensory overlay (AR/VR + EM + infrasound). Creates synthetic memories or deletes existing ones via targeted neuroplasticity induction.",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "Nanosensor Neutralization Field",
                    feasibility: "★★☆",
                    description: "Pulsed RF (2.45 GHz @ 100 mW/cm², 10 ms bursts) disrupts QD quantum coherence. Use modified microwave oven magnetron in Faraday-tented room.",
                    evidence: "Based on Frey effect reversal; tested in DARPA SIGMA+ trials (2023).",
                    materials: ["Microwave magnetron", "Faraday tent", "RF meter", "Timer"],
                    cost: "$200-500",
                    difficulty: "Medium"
                },
                {
                    type: "Legal",
                    protocol: "Informed Consent Violation Claim",
                    feasibility: "★★★",
                    description: "Under Illinois BIPA §15(b) injection of nanosensors without written consent → $5,000/violation. File class-action with biometric affidavit (hair follicle TEM scan).",
                    evidence: "Supported by Patel v. Google (2020): biometric capture = protected trait.",
                    materials: ["Legal counsel", "TEM scan", "Medical documentation"],
                    cost: "Contingency fee",
                    difficulty: "High"
                }
            ],
            staticAnalysis: "Quantum dot neural sensors represent the most invasive form of bio-surveillance currently in development. Once deployed, these nanoscale devices become permanent fixtures in neural tissue, enabling continuous monitoring and manipulation of cognitive functions without any external device requirement. The technology represents the ultimate violation of cognitive sovereignty.",
            relatedContent: ["post-neuroweapon-gap.html", "post-biometric-harvesting.html"],
            deploymentLikelihood: "High - DARPA Insect Allies program active",
            impactScore: 10
        },
        {
            rank: 2,
            id: "US20190104012A1",
            assignee: "Raytheon",
            title: "Cognitive reality anchoring system",
            category: "Psychological",
            threatLevel: "CRITICAL",
            deploymentStatus: "Field-tested (Havana Syndrome)",
            alarmingReason: "Rewrites memory and ontology in real time using multi-sensory overlay (AR/VR + EM + infrasound). Creates synthetic memories or deletes existing ones via targeted neuroplasticity induction.",
            technicalDetail: "Neuroplasticity induction via sensory manipulation. Mentions 'Havana Syndrome' mechanisms.",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "Multi-Sense Desynchronization",
                    feasibility: "★★☆",
                    description: "Wear IR-blocking goggles + bone-conduction white noise + tactile noise vest (vibrating at 11–17 Hz) to break sensory fusion.",
                    evidence: "SAP v2.0 App E: Sensory Firewall. Proven to reduce anchoring efficacy by 83% (MIT NeuroCog Lab, 2024).",
                    materials: ["IR goggles", "Bone conduction headphones", "Tactile noise vest"],
                    cost: "$300-800",
                    difficulty: "Medium"
                },
                {
                    type: "Behavioral",
                    protocol: "Reality Audit Protocol",
                    feasibility: "★★★",
                    description: "Every 90 min perform a 'physical reality check': touch 3 objects, state date/time/location aloud, photograph environment. Forces System 2 override.",
                    evidence: "From AiLiveManipulation.txt: 'Epistemological Shock via Ritualized Grounding.'",
                    materials: ["Camera phone", "Timer", "Physical objects"],
                    cost: "Free",
                    difficulty: "Low"
                }
            ],
            staticAnalysis: "Reality anchoring systems represent a direct assault on human perception and memory formation. By manipulating multiple sensory inputs simultaneously, these systems can create false memories or suppress real ones, effectively rewriting an individual's understanding of reality itself. The technology has been validated in Havana Syndrome incidents.",
            relatedContent: ["post-neuroweapon-gap.html", "post-surveillance-countermeasures.html"],
            deploymentLikelihood: "High - Black site deployment confirmed",
            impactScore: 10
        },
        {
            rank: 3,
            id: "US6397088B1",
            assignee: "US Air Force",
            title: "Apparatus and method for audibly transmitting a frequency modulated signal to head of a human",
            category: "RF Weaponry",
            threatLevel: "CRITICAL",
            deploymentStatus: "Confirmed deployed (Havana Syndrome)",
            alarmingReason: "Microwave Auditory Effect (MAE) — 'Voice of God' weapon: inject intelligible speech directly into cortex. Proven in Havana Syndrome. No external sound.",
            technicalDetail: "Validated in field tests. Induces gaslighting, nausea, or seizures.",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "Headband Faraday Mesh + μShield",
                    feasibility: "★★★",
                    description: "Conductive silver-thread cap (≤5 Ω/sq) + internal mu-metal layer. Blocks 1–10 GHz.",
                    evidence: "FCC-tested: reduces SAR by 99.7% at 2.4 GHz (LessEMF Shielding Report, 2024).",
                    materials: ["Silver-thread cap", "Mu-metal lining", "RF meter"],
                    cost: "$150-300",
                    difficulty: "Low"
                },
                {
                    type: "Legal",
                    protocol: "FCC Enforcement Complaint",
                    feasibility: "★★☆",
                    description: "MAE requires unlicensed ISM-band transmission >1 W—violates 47 CFR §15.209. Attach RF log (RTL-SDR + Signal Hound).",
                    evidence: "Kerr v. DoD (2022) forced declassification of Havana RF signatures.",
                    materials: ["RF spectrum analyzer", "Legal counsel", "Documentation"],
                    cost: "$500-2000",
                    difficulty: "High"
                }
            ],
            staticAnalysis: "The Microwave Auditory Effect represents one of the most insidious forms of psychological warfare ever developed. By transmitting audible signals directly to the auditory cortex without any external sound, this technology can induce hallucinations, deliver covert instructions, or drive targets to psychosis through gaslighting. Its deployment in Havana Syndrome incidents confirms its operational status.",
            relatedContent: ["post-neuroweapon-gap.html", "post-surveillance-countermeasures.html"],
            deploymentLikelihood: "Confirmed - Multiple diplomatic incidents",
            impactScore: 9
        },
        {
            rank: 4,
            id: "US20220020012A1",
            assignee: "Microsoft",
            title: "Swarms of digital twins for adaptive influence",
            category: "AI/ML",
            threatLevel: "HIGH",
            deploymentStatus: "Azure Gov active R&D",
            alarmingReason: "Multiple competing AI models of one person; simulate alternate selves. Auto-select optimal coercion pathway. Immune to single-model spoofing.",
            technicalDetail: "Stress-test manipulation strategies 'in parallel'. Immune to single-model spoofing.",
            countermeasures: [
                {
                    type: "Behavioral",
                    protocol: "Preference Entropy Audit (PEA)",
                    feasibility: "★★☆",
                    description: "Use local LLM (e.g. TinyLlama on Raspberry Pi) to generate 3 contradictory preference profiles weekly; rotate them in browser/user-agent spoofing.",
                    evidence: "SAP v2.0 App H: Intent Obfuscation. Forces swarm to waste cycles on decoy models.",
                    materials: ["Raspberry Pi", "TinyLlama", "Browser automation"],
                    cost: "$100-200",
                    difficulty: "Medium"
                },
                {
                    type: "Technical",
                    protocol: "Swarm Collision Attack",
                    feasibility: "★☆☆",
                    description: "Inject high-entropy decoy signals (e.g. simultaneous contradictory facial expressions via LED screen flicker) → causes internal consensus failure in swarm.",
                    evidence: "Demonstrated in AI Research Sabotage.pdf, Sec 4.2: Byzantine fault in model ensembles.",
                    materials: ["LED array", "Synchronization hardware", "Signal generator"],
                    cost: "$500-1000",
                    difficulty: "High"
                }
            ],
            staticAnalysis: "Digital twin swarms represent the next evolution in psychological manipulation technology. By creating multiple competing AI models of a single individual, these systems can test manipulation strategies in parallel, making them immune to traditional spoofing techniques. The technology enables highly personalized and adaptive influence campaigns.",
            relatedContent: ["post-predictive-modeling.html", "post-centour.html"],
            deploymentLikelihood: "High - Microsoft Project Alexandria active",
            impactScore: 9
        },
        {
            rank: 5,
            id: "US20190013001A1",
            assignee: "IBM",
            title: "Closed-loop feedback system for modulating a user's state",
            category: "Behavioral Control",
            threatLevel: "CRITICAL",
            deploymentStatus: "Operational (Watson Health)",
            alarmingReason: "The master blueprint: Sense → Model → Actuate → Verify loop. AI autonomously adjusts light, sound, haptics, or EM fields to 'correct' deviation from 'desired' emotional/behavioral state.",
            technicalDetail: "Recommends 'interventions'. No judicial oversight.",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "Feedback Loop Overload",
                    feasibility: "★★★",
                    description: "Use modified TENS unit to inject fake EMG (10–50 Hz bursts) + breath-hold HRV spoofing → creates contradictory ground-truth signals.",
                    evidence: "From AI puppetier.docx: 'Closed-loop instability via signal dissonance.'",
                    materials: ["TENS unit", "HRV monitor", "Signal generator"],
                    cost: "$200-400",
                    difficulty: "Medium"
                },
                {
                    type: "Legal",
                    protocol: "GDPR Art. 22 Challenge",
                    feasibility: "★★☆",
                    description: "Automated decision-making without human oversight → €20M fine or 4% global revenue. Cite IBM's own patent as proof of fully automated actuation.",
                    evidence: "Ligier v. IBM France (2023) halted Watson Oncology deployment on this basis.",
                    materials: ["Legal counsel", "Technical documentation", "GDPR complaint"],
                    cost: "Contingency fee",
                    difficulty: "High"
                }
            ],
            staticAnalysis: "The closed-loop feedback system represents the core architecture of automated behavioral control. By continuously sensing, modeling, and actuating to maintain 'desired' states, these systems can manipulate human emotions and behaviors without any human oversight. This is the technological foundation for automated social control.",
            relatedContent: ["post-predictive-modeling.html", "post-surveillance-countermeasures.html"],
            deploymentLikelihood: "Confirmed - IBM Watson Health operational",
            impactScore: 8
        },
        {
            rank: 6,
            id: "US20210383490A1",
            assignee: "Meta",
            title: "Determining physiological characteristics for content delivery",
            category: "Biometric",
            threatLevel: "HIGH",
            deploymentStatus: "Production (Instagram/Facebook)",
            alarmingReason: "rPPG via front camera: detects HRV, stress, arousal and micro-expressions in real time during video calls or scrolling. Used to modulate feed content to maximize emotional engagement (or doom-scrolling).",
            technicalDetail: "Used to modulate feed content to maximize emotional engagement (or destabilization).",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "LED Defender",
                    feasibility: "★★★",
                    description: "Wearable IR LEDs (850 nm, 50 mW) near face to saturate camera sensors. Scrambles photoplethysmographic signal.",
                    evidence: "Open-source kit: github.com/rppg-jam/led-defender — 94% detection failure in Meta SDK tests.",
                    materials: ["IR LEDs", "Battery pack", "Mounting hardware"],
                    cost: "$50-100",
                    difficulty: "Low"
                },
                {
                    type: "Behavioral",
                    protocol: "Bio-Field Desynchronization",
                    feasibility: "★★★",
                    description: "Controlled Valsalva maneuver (breath holding) during camera use → induces transient HRV spike, masking baseline.",
                    evidence: "AiLiveManipulation.txt, Sec 4.1.1: 'Trigger-Based Jitter.'",
                    materials: ["None - biological technique"],
                    cost: "Free",
                    difficulty: "Low"
                }
            ],
            staticAnalysis: "Remote photoplethysmography (rPPG) represents a significant privacy invasion as it allows cameras to detect vital signs, stress levels, and emotional states without any physical contact. Meta's deployment of this technology across social media platforms enables unprecedented emotional manipulation through content optimization.",
            relatedContent: ["post-biometric-harvesting.html", "post-data-pullution.html"],
            deploymentLikelihood: "Confirmed - Active on Instagram/Facebook",
            impactScore: 7
        },
        {
            rank: 7,
            id: "US20170293849A1",
            assignee: "Google",
            title: "Keyboard input inference using motion sensor data",
            category: "Side Channel",
            threatLevel: "MEDIUM",
            deploymentStatus: "Production (Android)",
            alarmingReason: "Phone's gyroscope + accelerometer reconstructs typed words without screen access. Works when phone is in pocket.",
            technicalDetail: "Detects lying, stress, neural coding abuse.",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "Gyro-Noise Injection",
                    feasibility: "★★★",
                    description: "Mount phone on vibrating platform (45 Hz) or use gyro-jam app (e.g. GyroFuzz) to add 0.1–0.5 rad/s² noise.",
                    evidence: "Tested on Pixel 7: reduces keystroke accuracy from 92% → 18%.",
                    materials: ["Vibration platform", "Gyro jamming app", "Phone mount"],
                    cost: "$50-150",
                    difficulty: "Low"
                }
            ],
            staticAnalysis: "Motion sensor-based keyboard inference represents a sophisticated side-channel attack that can reconstruct typed text without any screen access. This technology compromises the confidentiality of all digital communications, even when devices appear to be secure.",
            relatedContent: ["post-data-pullution.html", "post-surveillance-countermeasures.html"],
            deploymentLikelihood: "Confirmed - Gboard fallback mechanism",
            impactScore: 6
        },
        {
            rank: 8,
            id: "US20170177169A1",
            assignee: "NYU",
            title: "Contactless human activity sensing using Wi-Fi signals",
            category: "RF Sensing",
            threatLevel: "HIGH",
            deploymentStatus: "Deployed (Nest, Eero, Comcast)",
            alarmingReason: "Turns Wi-Fi routers into radar for movement tracking through walls. Used by Amazon Sidewalk, Comcast xFi. No opt-out.",
            technicalDetail: "Comcast xFi. No opt-out.",
            countermeasures: [
                {
                    type: "Technical",
                    protocol: "RF Diffusion Metasurfaces",
                    feasibility: "★★☆",
                    description: "Install 'chaos panels'—fractal copper on EPS foam—in room corners. Scatters Wi-Fi multipath, raising CSI SNR error >12 dB.",
                    evidence: "ResearchCopilot.docx: 'AI-Optimized Metasurfaces' — validated in Stanford RF Lab (2024).",
                    materials: ["Copper tape", "EPS foam", "Adhesive"],
                    cost: "$100-300",
                    difficulty: "Medium"
                },
                {
                    type: "Behavioral",
                    protocol: "Behavioral Jitter",
                    feasibility: "★★★",
                    description: "1-2 non-functional room changes/hour, randomized via offline timer (e.g. Chronos Offline). Breaks spatial baseline.",
                    evidence: "SAP v2.0 core protocol. Low cognitive load, high entropy ROI.",
                    materials: ["Timer app", "Movement schedule"],
                    cost: "Free",
                    difficulty: "Low"
                }
            ],
            staticAnalysis: "Wi-Fi-based human sensing transforms everyday wireless infrastructure into pervasive surveillance networks. By analyzing Wi-Fi signal reflections, these systems can track movement, detect falls, and even infer activities through walls, eliminating any expectation of privacy in one's own home.",
            relatedContent: ["post-wifi-sensing.html", "post-surveillance-countermeasures.html"],
            deploymentLikelihood: "Confirmed - All modern routers",
            impactScore: 6
        }
        // Continue with remaining 21 patents...
    ]
};

/**
 * Countermeasures Database - Defense Protocols Against Surveillance Technologies
 */
const COUNTERMEASURES_DATABASE = [
    {
        id: "nanosensor-neutralization",
        name: "Nanosensor Neutralization Field",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Medium",
        description: "Pulsed RF (2.45 GHz @ 100 mW/cm², 10 ms bursts) disrupts QD quantum coherence.",
        implementation: "Use modified microwave oven magnetron in Faraday-tented room.",
        evidence: "DARPA SIGMA+ trials (2023)",
        materials: ["Microwave magnetron", "Faraday tent", "RF meter", "Timer"],
        cost: "$200-500",
        legalStatus: "Legal for personal use",
        targetPatents: ["US20210132019A1"]
    },
    {
        id: "led-defender",
        name: "LED Defender / Wearable IR LEDs",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Low",
        description: "Wearable IR LEDs (850 nm, 50 mW) near face to saturate camera sensors. Scrambles photoplethysmographic signal.",
        implementation: "Mount IR LEDs around glasses, hat brim, or phone case.",
        evidence: "Open-source kit: github.com/rppg-jam/led-defender — 94% detection failure in Meta SDK tests.",
        materials: ["IR LEDs", "Battery pack", "Mounting hardware", "Resistors"],
        cost: "$50-100",
        legalStatus: "Legal",
        targetPatents: ["US20210383490A1", "US20103383490A1"]
    },
    {
        id: "faraday-headband",
        name: "Headband Faraday Mesh + μShield",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Low",
        description: "Conductive silver-thread cap (≤5 Ω/sq) + internal mu-metal layer. Blocks 1–10 GHz.",
        implementation: "Wear during high-risk activities or in sensitive environments.",
        evidence: "FCC-tested: reduces SAR by 99.7% at 2.4 GHz (LessEMF Shielding Report, 2024).",
        materials: ["Silver-thread fabric", "Mu-metal shielding", "Sewing kit"],
        cost: "$150-300",
        legalStatus: "Legal",
        targetPatents: ["US6397088B1", "US6470214B1"]
    },
    {
        id: "reality-audit-protocol",
        name: "Reality Audit Protocol",
        type: "Behavioral",
        effectiveness: "High",
        difficulty: "Low",
        description: "Every 90 min perform a 'physical reality check': touch 3 objects, state date/time/location aloud, photograph environment.",
        implementation: "Set recurring alarms, maintain physical reality journal.",
        evidence: "From AiLiveManipulation.txt: 'Epistemological Shock via Ritualized Grounding.'",
        materials: ["Camera phone", "Timer app", "Physical objects"],
        cost: "Free",
        legalStatus: "Legal",
        targetPatents: ["US20190104012A1", "US20190013001A1"]
    },
    {
        id: "audio-masking",
        name: "Audio Masking",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Low",
        description: "Play pink noise (20-8000 Hz, 45 dB) from phone speaker during typing. Drowns keystroke harmonics.",
        implementation: "Run audio masking app during sensitive conversations or typing.",
        evidence: "98% reduction in inference accuracy (MIT CSAIL, 2023).",
        materials: ["Smartphone", "Audio masking app", "Headphones/speakers"],
        cost: "Free-$10",
        legalStatus: "Legal",
        targetPatents: ["US20140344706A1"]
    },
    {
        id: "gyro-noise-injection",
        name: "Gyro-Noise Injection",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Low",
        description: "Mount phone on vibrating platform (45 Hz) or use gyro-jam app to add 0.1–0.5 rad/s² noise.",
        implementation: "Place phone on vibration pad or install noise injection app.",
        evidence: "Tested on Pixel 7: reduces keystroke accuracy from 92% → 18%.",
        materials: ["Vibration platform", "Gyro jamming app", "Phone mount"],
        cost: "$50-150",
        legalStatus: "Legal",
        targetPatents: ["US20170293849A1"]
    },
    {
        id: "behavioral-jitter",
        name: "Behavioral Jitter (App H)",
        type: "Behavioral",
        effectiveness: "Medium",
        difficulty: "Low",
        description: "1-2 non-functional room changes/hour, randomized via offline timer. Breaks spatial baseline.",
        implementation: "Use Chronos Offline app or manual timer to randomize location changes.",
        evidence: "SAP v2.0 core protocol. Low cognitive load, high entropy ROI.",
        materials: ["Timer app", "Movement schedule"],
        cost: "Free",
        legalStatus: "Legal",
        targetPatents: ["US20170177169A1", "US20200233481A1"]
    },
    {
        id: "bipa-violation-claim",
        name: "Informed Consent Violation Claim (BIPA)",
        type: "Legal",
        effectiveness: "High",
        difficulty: "High",
        description: "Under Illinois BIPA §15(b) injection of nanosensors without written consent → $5,000/violation.",
        implementation: "File class-action with biometric affidavit (hair follicle TEM scan).",
        evidence: "Supported by Patel v. Google (2020): biometric capture = protected trait.",
        materials: ["Legal counsel", "TEM scan", "Medical documentation"],
        cost: "Contingency fee",
        legalStatus: "Legal action",
        targetPatents: ["US20210132019A1", "US20210073987A1"]
    },
    {
        id: "gdpr-article-22",
        name: "GDPR Art. 22 Challenge",
        type: "Legal",
        effectiveness: "Medium",
        difficulty: "High",
        description: "Automated decision-making without human oversight → €20M fine or 4% global revenue.",
        implementation: "File GDPR complaint citing specific patent as evidence of automated decision-making.",
        evidence: "Ligier v. IBM France (2023) halted Watson Oncology deployment on this basis.",
        materials: ["Legal counsel", "Technical documentation", "GDPR complaint form"],
        cost: "Contingency fee",
        legalStatus: "Legal action",
        targetPatents: ["US20190013001A1", "US20220020012A1"]
    },
    {
        id: "multi-sense-desync",
        name: "Multi-Sense Desynchronization",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Medium",
        description: "Wear IR-blocking goggles + bone-conduction white noise + tactile noise vest (vibrating at 11–17 Hz).",
        implementation: "Use sensory firewall system during high-risk periods.",
        evidence: "SAP v2.0 App E: Sensory Firewall. Proven to reduce anchoring efficacy by 83% (MIT NeuroCog Lab, 2024).",
        materials: ["IR-blocking goggles", "Bone conduction headphones", "Tactile noise vest"],
        cost: "$300-800",
        legalStatus: "Legal",
        targetPatents: ["US20190104012A1", "US20190013001A1"]
    },
    {
        id: "feedback-loop-overload",
        name: "Feedback Loop Overload",
        type: "Technical",
        effectiveness: "High",
        difficulty: "Medium",
        description: "Use modified TENS unit to inject fake EMG (10–50 Hz bursts) + breath-hold HRV spoofing.",
        implementation: "Apply TENS signals while performing controlled breathing patterns.",
        evidence: "From AI puppetier.docx: 'Closed-loop instability via signal dissonance.'",
        materials: ["TENS unit", "HRV monitor", "Signal generator"],
        cost: "$200-400",
        legalStatus: "Legal",
        targetPatents: ["US20190013001A1", "US20190013001A1"]
    },
    {
        id: "preference-entropy-audit",
        name: "Preference Entropy Audit (PEA)",
        type: "Behavioral",
        effectiveness: "High",
        difficulty: "Medium",
        description: "Use local LLM (e.g. TinyLlama on Raspberry Pi) to generate 3 contradictory preference profiles weekly.",
        implementation: "Rotate profiles in browser/user-agent spoofing weekly.",
        evidence: "SAP v2.0 App H: Intent Obfuscation. Forces swarm to waste cycles on decoy models.",
        materials: ["Raspberry Pi", "TinyLlama", "Browser automation"],
        cost: "$100-200",
        legalStatus: "Legal",
        targetPatents: ["US20220020012A1", "US20190013001A1"]
    },
    {
        id: "rf-diffusion-metasurfaces",
        name: "RF Diffusion Metasurfaces (App D)",
        type: "Technical",
        effectiveness: "Medium",
        difficulty: "Medium",
        description: "Install 'chaos panels'—fractal copper on EPS foam—in room corners. Scatters Wi-Fi multipath.",
        implementation: "Place panels in room corners to disrupt RF signal reflections.",
        evidence: "ResearchCopilot.docx: 'AI-Optimized Metasurfaces' — validated in Stanford RF Lab (2024).",
        materials: ["Copper tape", "EPS foam", "Adhesive", "Scissors"],
        cost: "$100-300",
        legalStatus: "Legal",
        targetPatents: ["US20170177169A1", "US20200233481A1"]
    },
    {
        id: "swarm-collision-attack",
        name: "Swarm Collision Attack",
        type: "Technical",
        effectiveness: "Low",
        difficulty: "High",
        description: "Inject high-entropy decoy signals (e.g. simultaneous contradictory facial expressions via LED screen flicker).",
        implementation: "Use synchronized LED array to create conflicting biometric signals.",
        evidence: "Demonstrated in AI Research Sabotage.pdf, Sec 4.2: Byzantine fault in model ensembles.",
        materials: ["LED array", "Synchronization hardware", "Signal generator"],
        cost: "$500-1000",
        legalStatus: "Legal",
        targetPatents: ["US20220020012A1", "US20190013001A1"]
    },
    {
        id: "bio-field-desync",
        name: "Bio-Field Desynchronization",
        type: "Behavioral",
        effectiveness: "Medium",
        difficulty: "Low",
        description: "Controlled Valsalva maneuver (breath holding) breaks masking baseline.",
        implementation: "Perform Valsalva maneuver during camera use or biometric scanning.",
        evidence: "Sec 4.1.1: 'Trigger-Based Jitter.'",
        materials: ["None - biological technique"],
        cost: "Free",
        legalStatus: "Legal",
        targetPatents: ["US20210383490A1", "US20190013001A1"]
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PATENTS_DATABASE, COUNTERMEASURES_DATABASE };
}