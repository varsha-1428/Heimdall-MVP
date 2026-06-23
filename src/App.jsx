import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// 1. LOGIN COMPONENT
// ============================================================================
const Login = ({ onLogin }) => {
  const [view, setView] = useState('signin');
  const [role, setRole] = useState('Resident');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // 🔌 BACKEND TEAM: Replace this timeout with a fetch() call to /api/login
    // const response = await fetch('http://localhost:8000/api/login', { ... })
    setTimeout(() => {
      onLogin(role);
    }, 500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const p1 = e.target.newPwd.value;
    const p2 = e.target.confirmPwd.value;

    if (p1 !== p2) {
      setError('Passwords do not match.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('Registration successful! Routing to login...');
      setTimeout(() => {
        setSuccess('');
        setView('signin');
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-950 flex items-center justify-center min-h-screen font-sans text-gray-200 p-4 w-full">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-8 relative overflow-hidden" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)' }}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest">HEIMDALL</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Authentication Gateway</p>
        </div>

        {view === 'signin' ? (
          <div className="animate-fadeIn block">
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 text-center">Select Operating Role</p>
              <div className="flex space-x-2">
                {['Resident', 'Security', 'Admin'].map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`flex-1 py-2 text-sm rounded-lg border transition-all ${role === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-500'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Network ID</label>
                <input type="text" placeholder="ID (e.g. res_142)" required className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <input type={showPwd ? "text" : "password"} placeholder="••••••••" required className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mt-4 transition shadow-lg">
                Authenticate
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Unregistered entity? </span>
              <button onClick={() => setView('signup')} className="text-blue-400 hover:text-blue-300 font-semibold transition">Activate Account</button>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn block">
            <div className="mb-5 border-b border-gray-800 pb-3">
              <h2 className="text-lg font-bold text-white text-center">Entity Registration</h2>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Allotted ID</label>
                  <input type="text" placeholder="ID" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Temp Passcode</label>
                  <input type="text" placeholder="Passcode" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1">New Secure Password</label>
                <input name="newPwd" type={showPwd ? "text" : "password"} placeholder="••••••••" required className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-8 text-gray-500 hover:text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>
              </div>

              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1">Confirm New Password</label>
                <input name="confirmPwd" type={showPwd ? "text" : "password"} placeholder="••••••••" required className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12" />
              </div>

              {error && <div className="text-red-400 text-xs text-center p-2 bg-red-900/30 border border-red-800 rounded">{error}</div>}
              {success && <div className="text-green-400 text-xs text-center p-2 bg-green-900/30 border border-green-800 rounded">{success}</div>}

              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg mt-2 transition">
                Initialize Credentials
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <button onClick={() => setView('signin')} className="text-gray-500 hover:text-white transition">← Return to Authentication</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 2. RESIDENT PORTAL COMPONENT
// ============================================================================
const ResidentPortal = ({ onLogout }) => {
  const [toast, setToast] = useState(false);
  const [guestSuccess, setGuestSuccess] = useState(false);
  const [groupSuccess, setGroupSuccess] = useState(false);
  const [cardReported, setCardReported] = useState(false);

  const triggerAlert = () => {
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    setGuestSuccess(true);
    setTimeout(() => setGuestSuccess(false), 3000);
    e.target.reset();
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    setGroupSuccess(true);
    setTimeout(() => setGroupSuccess(false), 3000);
    e.target.reset();
  };

  return (
    <div className="bg-gray-950 min-h-screen font-sans text-gray-200 overflow-x-hidden w-full">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-widest text-white">HEIMDALL</span>
          <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 border border-blue-800 rounded text-xs font-mono font-bold hidden sm:inline-block">RESIDENT PORTAL</span>
        </div>
        <button onClick={onLogout} className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition">Disconnect</button>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        
        {/* Admin Broadcast Info Bar */}
        <div className="bg-blue-900/30 border border-blue-800/60 text-blue-200 px-4 py-3 rounded-lg flex items-start sm:items-center space-x-3 mb-6 shadow-lg animate-fadeIn">
          <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-sm font-medium">
            <strong className="text-blue-300">Admin Broadcast:</strong> Heimdall AI network maintenance scheduled for tonight at 02:00 AM. Expect brief portal interruptions.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1: Group Pass & Emergency */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Issue Group Event Pass</h2>
              <form className="space-y-4" onSubmit={handleGroupSubmit}>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Event / Group Name</label>
                  <input type="text" placeholder="e.g. Birthday Party" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Entry Date</label>
                    <input type="date" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Duration (Days)</label>
                    <input type="number" min="1" placeholder="1" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Number of Visitors</label>
                  <input type="number" min="2" placeholder="e.g. 15" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                </div>
                
                {groupSuccess && <div className="text-green-400 text-xs text-center p-2 bg-green-900/30 border border-green-800 rounded">Group QR Master Pass Generated!</div>}
                
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition shadow-lg mt-2">Generate Group QR</button>
              </form>
            </div>

            <button 
              onClick={() => setCardReported(true)} 
              disabled={cardReported}
              className={`w-full font-bold py-3 px-4 rounded-lg transition ${cardReported ? 'bg-gray-800 text-gray-500 border-gray-700' : 'bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700'}`}>
              {cardReported ? 'Card Locked' : 'Report Lost / Stolen Card'}
            </button>
          </div>

          {/* COLUMN 2: Alerts Inbox */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 flex flex-col h-full min-h-[24rem]">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Alerts Inbox</h2>
              <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              <div className="bg-yellow-950/30 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                <span className="text-xs font-bold text-yellow-400 uppercase">MEDIUM SEVERITY</span>
                <p className="text-sm text-gray-300 mt-1">Tailgating anomaly recorded during entry. Please ensure doors close securely.</p>
              </div>
            </div>
            <button onClick={triggerAlert} className="m-3 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded transition">Simulate Push Notification</button>
          </div>

          {/* COLUMN 3: Single Guest Pass */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Issue Single Guest Pass</h2>
            <form className="space-y-4" onSubmit={handleGuestSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Guest Full Name</label>
                <input type="text" placeholder="e.g. Jane Smith" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Entry Date</label>
                  <input type="date" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Duration (Days)</label>
                  <input type="number" min="1" placeholder="1" required className="w-full px-3 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>
              </div>
              
              {guestSuccess && <div className="text-green-400 text-xs text-center p-2 bg-green-900/30 border border-green-800 rounded">Single QR Pass Generated!</div>}
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition shadow-lg mt-2">Generate QR</button>
            </form>
          </div>

        </div>

        {/* FULL WIDTH BOTTOM: Live Access & Guest Telemetry */}
        <div className="mt-6 bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Access Telemetry & Guest Log</h2>
            <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">Last 7 Days</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs text-gray-500 uppercase bg-gray-950/50 border-y border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Timestamp</th>
                  <th className="px-4 py-3 font-medium">Entity / Guest Name</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Clearance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono text-xs">
                <tr className="hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-gray-500">Today, 14:32:01</td>
                  <td className="px-4 py-3"><span className="text-white font-sans font-bold">John Doe</span> <span className="text-[10px] text-gray-500 ml-1 uppercase">Resident</span></td>
                  <td className="px-4 py-3">North Gate</td>
                  <td className="px-4 py-3"><span className="text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-800/50">ACCESS_GRANTED</span></td>
                </tr>
                <tr className="hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-gray-500">Today, 10:15:44</td>
                  <td className="px-4 py-3"><span className="text-blue-400 font-sans font-bold">Jane Smith</span> <span className="text-[10px] text-blue-500 ml-1 uppercase">Guest QR</span></td>
                  <td className="px-4 py-3">Lobby Turnstile</td>
                  <td className="px-4 py-3"><span className="text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-800/50">ACCESS_GRANTED</span></td>
                </tr>
                <tr className="hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-gray-500">Yesterday, 19:05:12</td>
                  <td className="px-4 py-3"><span className="text-purple-400 font-sans font-bold">Birthday Party</span> <span className="text-[10px] text-purple-500 ml-1 uppercase">Group QR</span></td>
                  <td className="px-4 py-3">South Gate</td>
                  <td className="px-4 py-3"><span className="text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-800/50">ACCESS_GRANTED (4/15)</span></td>
                </tr>
                <tr className="hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-gray-500">Yesterday, 08:14:12</td>
                  <td className="px-4 py-3"><span className="text-white font-sans font-bold">John Doe</span> <span className="text-[10px] text-gray-500 ml-1 uppercase">Resident</span></td>
                  <td className="px-4 py-3">Server Room</td>
                  <td className="px-4 py-3"><span className="text-red-400 bg-red-900/30 px-2 py-1 rounded border border-red-800/50">DENIED_UNAUTHORIZED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Push Toast */}
      {toast && (
        <div className="fixed top-5 right-5 w-80 bg-gray-900 border-l-4 border-red-500 rounded-lg shadow-2xl p-4 animate-slideInRight z-50">
          <p className="text-sm font-bold text-white">Critical: Unauthorized Access</p>
          <p className="text-xs text-gray-400 mt-1">ID flagged at Server Room. Tap to view.</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. SECURITY GUARD COMPONENT (Live Ops)
// ============================================================================
const GuardDashboard = ({ onLogout }) => {
  const [alarmActive, setAlarmActive] = useState(false);
  const [intercomState, setIntercomState] = useState('idle'); // idle, calling, connected
  const [flatNumber, setFlatNumber] = useState('');
  const [feed, setFeed] = useState([
    { id: 1, time: '10:14:05', loc: 'LOBBY_ENTRANCE', type: 'Badge_Swipe', status: 'SUCCESS', color: 'text-emerald-500' },
    { id: 2, time: '10:12:40', loc: 'NORTH_GATE', type: 'Camera_Scan', status: 'SUCCESS (0.98)', color: 'text-emerald-500' }
  ]);
  const feedEndRef = useRef(null);

  // AI Feedback State
  const [resolutionStep, setResolutionStep] = useState(null); // null, 'feedback', 'submitted'
  const [actionTaken, setActionTaken] = useState('');
  const [feedback, setFeedback] = useState('');

  // 🔌 BACKEND TEAM: WebSocket Integration goes here!
  useEffect(() => {
    /*
    const ws = new WebSocket('ws://localhost:8000/ws/guard');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAlarmActive(true); // Trigger UI alarm
    };
    return () => ws.close();
    */
  }, []);

  // Simulate Live Telemetry Feed
  useEffect(() => {
    const gates = ["NORTH_GATE", "SOUTH_GATE", "LOBBY_ENTRANCE", "GYM_TURNSTILE"];
    const events = ["Badge_Swipe", "Camera_Scan", "QR_Scan"];
    
    const interval = setInterval(() => {
      if(!alarmActive && !resolutionStep) {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const newEvent = {
          id: Date.now(),
          time: time,
          loc: gates[Math.floor(Math.random() * gates.length)],
          type: events[Math.floor(Math.random() * events.length)],
          status: 'SUCCESS',
          color: 'text-emerald-500'
        };
        setFeed(prev => [...prev, newEvent].slice(-15)); // Keep last 15 items
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [alarmActive, resolutionStep]);

  // Auto-scroll feed to bottom
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feed]);

  const initiateResolution = (action) => {
    setActionTaken(action);
    setResolutionStep('feedback');
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    setResolutionStep('submitted');
    
    // 🔌 BACKEND TEAM: Send this feedback to the LLM tuning endpoint
    // fetch('/api/llm-feedback', { method: 'POST', body: JSON.stringify({ action: actionTaken, context: feedback }) });
    
    setTimeout(() => {
      setAlarmActive(false);
      setResolutionStep(null);
      setFeedback('');
      if (actionTaken === 'BLACKLIST') {
        alert("A formal Blacklist Request has been forwarded to the Admin Control Tower.");
      }
    }, 2500);
  };

  const handleCall = (e) => {
    e.preventDefault();
    if (!flatNumber) return;
    setIntercomState('calling');
    setTimeout(() => {
      setIntercomState('connected');
    }, 3000);
  };

  const endCall = () => {
    setIntercomState('idle');
    setFlatNumber('');
  };

  return (
    <div className="bg-gray-950 min-h-screen font-sans text-gray-200 h-screen overflow-hidden flex flex-col w-full">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-widest text-white">HEIMDALL LOC</span>
          <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 border border-emerald-800 rounded text-xs font-mono font-bold animate-pulse">STREAM ONLINE</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right border-r border-gray-800 pr-6 hidden sm:block">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Active Queue</p>
            <p className={`text-sm font-bold font-mono ${alarmActive ? 'text-red-400' : 'text-blue-400'}`}>
              {alarmActive ? '1 Pending Alarm' : '0 Pending Alarms'}
            </p>
          </div>
          <button onClick={onLogout} className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition">Log Out</button>
        </div>
      </nav>

      <main className="p-6 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full overflow-y-auto pr-2">
          {/* Dynamic Alarm Card */}
          <div className={`bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 shadow-2xl shrink-0 ${alarmActive && !resolutionStep ? 'animate-pulseRed' : ''}`}>
            {!alarmActive ? (
              <div className="py-16 text-center">
                <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="text-xl font-bold text-gray-400">Perimeter Stream Stable</h3>
                <p className="text-sm text-gray-500 mt-1">Autonomous AI investigation queue is currently empty.</p>
                <button onClick={() => setAlarmActive(true)} className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition shadow-lg border border-blue-500">Simulate AI Trigger</button>
              </div>
            ) : resolutionStep === 'feedback' ? (
              <div className="animate-fadeIn block py-4">
                <div className="flex items-center space-x-3 border-b border-gray-800 pb-4 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-800 text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Provide AI Training Context</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Your input tunes the Heimdall LLM for future incidents.</p>
                  </div>
                </div>
                
                <form onSubmit={submitFeedback} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">
                      Action Logged: <span className={actionTaken === 'DISMISSED' ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'}>{actionTaken}</span>
                    </label>
                    <textarea 
                      required
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="e.g., Resident was carrying heavy groceries, authorized a friend to hold the door. False positive on tailgating."
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition h-28 resize-none shadow-inner"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button type="button" onClick={() => setResolutionStep(null)} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition font-medium border border-gray-700">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center space-x-2 border border-blue-500">
                      <span>Submit to Neural Net</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </form>
              </div>
            ) : resolutionStep === 'submitted' ? (
              <div className="py-16 text-center animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-800 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Context Ingested Successfully</h3>
                <p className="text-sm text-gray-400 mt-2">LLM weights will be adjusted in the next nightly batch training.</p>
                <p className="text-xs text-gray-500 mt-1 font-mono">Clearing active alarm queue...</p>
              </div>
            ) : (
              <div className="animate-fadeIn block">
                <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
                  <div>
                    <span className="px-2 py-1 bg-red-900/50 text-red-400 border border-red-800 text-xs font-mono rounded font-bold uppercase tracking-wide mr-2">CRITICAL</span>
                    <h2 className="text-xl font-bold text-white inline-block mt-2 sm:mt-0">IDENTITY_THEFT_SUSPECT</h2>
                    <p className="text-sm text-gray-400 mt-1 font-mono">Location: server_room_door</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 bg-gray-950 px-2 py-1 rounded border border-gray-800">Just Now</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Profile Identity</p>
                    <p className="text-sm font-bold text-white mt-1">Bob Vance (res_250)</p>
                    <p className="text-xs text-yellow-400 mt-0.5">Trust: 70 | Past Infractions: 2</p>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Location History</p>
                    <p className="text-sm font-bold text-white mt-1">North Gate</p>
                    <p className="text-xs text-gray-400 mt-0.5">0 incidents today</p>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">2Hr Global Sync</p>
                    <p className="text-sm font-bold text-white mt-1">Clear</p>
                    <p className="text-xs text-gray-400 mt-0.5">No concurrent anomalies</p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-2">AI Diagnostic Rationale</h4>
                  <div className="bg-gray-950 p-4 rounded-lg border-l-4 border-blue-500 text-sm text-gray-300 leading-relaxed">
                    Analyzing telemetry vectors... Tailgating anomaly detected. Subject Bob Vance swiped access card, but perimeter cameras detected an unauthorized individual following closely behind. Given Bob's history of past infractions, there is a high probability of deliberate rule circumvention.
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-800 gap-3">
                  <button onClick={() => initiateResolution('BLACKLIST')} className="px-4 py-2 bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800 rounded-lg text-sm transition flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span>Request Admin Blacklist</span>
                  </button>
                  <div className="flex space-x-3">
                    <button onClick={() => initiateResolution('DISMISSED')} className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition border border-gray-700">Dismiss</button>
                    <button onClick={() => initiateResolution('DISPATCHED')} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition shadow-lg">Confirm Threat & Intercept</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resident Intercom System */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg shrink-0">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resident Intercom</h2>
            </div>
            
            <form onSubmit={handleCall} className="flex gap-3">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={flatNumber}
                  onChange={(e) => setFlatNumber(e.target.value)}
                  disabled={intercomState !== 'idle'}
                  required 
                  placeholder="Enter Flat (e.g., A-402)" 
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition disabled:opacity-50" 
                />
              </div>
              <button 
                type="submit" 
                disabled={intercomState !== 'idle'}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg border border-gray-700 font-bold transition flex items-center space-x-2 disabled:opacity-50"
              >
                <span>Call</span>
              </button>
            </form>

            {intercomState !== 'idle' && (
              <div className={`mt-3 p-3 border rounded-lg flex items-center justify-between ${intercomState === 'calling' ? 'bg-blue-900/20 border-blue-800/50' : 'bg-emerald-900/20 border-emerald-800/50'}`}>
                <div className="flex items-center space-x-3">
                  <span className="flex h-3 w-3 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${intercomState === 'calling' ? 'bg-blue-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${intercomState === 'calling' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span className={`text-sm font-mono ${intercomState === 'calling' ? 'text-blue-400' : 'text-emerald-400'}`}>
                    {intercomState === 'calling' ? `Dialing Flat ${flatNumber.toUpperCase()}...` : `Connected to ${flatNumber.toUpperCase()} (00:01)`}
                  </span>
                </div>
                <button type="button" onClick={endCall} className="text-xs bg-red-900/50 text-red-400 hover:bg-red-900 px-3 py-1 rounded border border-red-800 transition">End Call</button>
              </div>
            )}
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 flex flex-col h-full overflow-hidden shadow-lg shadow-blue-900/10">
          <div className="p-4 border-b border-gray-800 bg-gray-950/30 flex justify-between items-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Event Stream</h3>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px] text-gray-500 scroll-smooth">
            {feed.map((item) => (
              <div key={item.id} className="border-b border-gray-800/50 pb-2 animate-fadeIn">
                <span className="text-gray-400">[{item.time}]</span> {item.loc} <br/> 
                {item.type} <span className={`${item.color} ml-2`}>{item.status}</span>
              </div>
            ))}
            <div ref={feedEndRef} />
          </div>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// 4. ADMIN TOWER COMPONENT
// ============================================================================
const AdminTower = ({ onLogout }) => {
  const [lockdown, setLockdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequest, setPendingRequest] = useState(true);
  const [users, setUsers] = useState([
    { id: 'res_142', name: 'John Doe', role: 'Resident', score: 95, status: 'Active', color: 'text-emerald-400', roleColor: 'bg-gray-800' },
    { id: 'res_250', name: 'Bob Vance', role: 'Contractor', score: 70, status: 'Flagged', color: 'text-yellow-400', roleColor: 'bg-blue-900/30 text-blue-400 border border-blue-800/50' },
    { id: 'sec_001', name: 'Unit Alpha', role: 'Security', score: 100, status: 'Active', color: 'text-emerald-400', roleColor: 'bg-gray-800 text-gray-400' },
    { id: 'adm_441', name: 'Alice Smith', role: 'Admin', score: 99, status: 'Active', color: 'text-emerald-400', roleColor: 'bg-purple-900/30 text-purple-400 border border-purple-800/50' },
  ]);

  const handleBlacklist = (approved) => {
    if (approved) {
      alert("Blacklist Approved. Bob Vance (res_250) credentials have been permanently revoked.");
      setUsers(users.map(u => 
        u.id === 'res_250' ? { ...u, score: 0, status: 'BLACKLISTED', color: 'text-red-500' } : u
      ));
    } else {
      alert("Request Rejected. Informing Guard Unit Alpha.");
    }
    setPendingRequest(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen font-sans text-gray-200 transition-colors duration-500 overflow-x-hidden w-full ${lockdown ? 'bg-red-950/90' : 'bg-gray-950'}`}>
      <nav className="bg-gray-900 border-b border-purple-900/50 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-widest text-white">HEIMDALL TOWER</span>
          <span className="px-2 py-0.5 bg-purple-900/40 text-purple-400 border border-purple-800 rounded text-xs font-mono font-bold hidden sm:inline-block">ROOT ACCESS</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block border-r border-gray-700 pr-4">
            <p className="text-sm text-white font-bold">System Ops</p>
            <p className="text-xs text-gray-500 font-mono">Level: Tier-0</p>
          </div>
          <button onClick={onLogout} className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition">Disconnect</button>
        </div>
      </nav>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Top Row: Executive Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">AI Threat Detection</span>
            <div className="flex items-end space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">99.4%</span>
              <span className="text-xs text-emerald-500 mb-1">↑ 0.2%</span>
            </div>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">False Positive Override</span>
            <span className="text-2xl font-bold text-blue-400 mt-1">1.2%</span>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Telemetry Processed</span>
            <span className="text-2xl font-bold text-gray-200 mt-1 font-mono">1,402,881</span>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex flex-col justify-center border-l-4 border-l-purple-500">
            <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Active Hardware Gates</span>
            <span className="text-2xl font-bold text-purple-300 mt-1">14 / 14 Online</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
          {/* LEFT COLUMN: Escalation Queue & Overrides */}
          <div className="space-y-6 flex flex-col">
            
            {/* Guard Escalation Queue */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950/30">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Escalation Queue</h2>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pendingRequest ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                  {pendingRequest ? '1 Pending' : '0 Pending'}
                </span>
              </div>
              
              <div className="p-4 space-y-4">
                {pendingRequest ? (
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 animate-fadeIn">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-purple-400 uppercase bg-purple-900/30 px-2 py-1 rounded">Blacklist Request</span>
                      <span className="text-[10px] text-gray-500">From: Unit Alpha</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">Subject: Bob Vance (res_250)</h3>
                    <p className="text-xs text-gray-400 mb-3">AI flagged 3rd tailgating violation. Guard intercepted and verified intentional breach. Requesting immediate credential revocation.</p>
                    
                    <div className="flex space-x-2 border-t border-gray-800 pt-3">
                      <button onClick={() => handleBlacklist(true)} className="flex-1 bg-red-900/50 hover:bg-red-900 text-red-300 border border-red-800 py-1.5 rounded text-xs font-bold transition">Approve (Revoke)</button>
                      <button onClick={() => handleBlacklist(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 py-1.5 rounded text-xs transition">Reject</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 animate-fadeIn">
                    <svg className="w-10 h-10 text-gray-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <p className="text-sm text-gray-500">All escalations resolved.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Global Overrides */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shrink-0" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)' }}>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Global Overrides</h2>
              <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest">Bypasses Tier-1 & Tier-2 Autonomous Logic</p>
              
              <div className="space-y-3">
                <button onClick={() => setLockdown(!lockdown)} className={`w-full font-bold py-3 px-4 rounded-lg transition flex justify-center items-center space-x-2 ${lockdown ? 'bg-red-600 text-white shadow-lg' : 'bg-red-950 text-red-400 border border-red-800 hover:bg-red-900'}`}>
                  <span>{lockdown ? '⚠️ CANCEL LOCKDOWN & RESTORE' : '🚨 INITIATE CAMPUS LOCKDOWN'}</span>
                </button>
                <button className="w-full bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-500 border border-yellow-700/50 font-bold py-3 px-4 rounded-lg transition">
                  OPEN ALL FIRE GATES (EVAC)
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Identity Matrix Registry */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 h-full flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center flex-wrap gap-3">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Identity Matrix Registry</h2>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ID or Name..." 
                  className="pl-8 pr-3 py-1.5 bg-gray-950 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-purple-500 w-full sm:w-64 transition"
                />
                <svg className="w-4 h-4 text-gray-500 absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-xs text-gray-500 uppercase bg-gray-950/50 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">User Profile</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Integrity Score</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 font-mono text-xs">
                  {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4">
                        <p className="text-white font-bold font-sans">{u.name}</p>
                        <p className="text-gray-500">{u.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider ${u.roleColor}`}>{u.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${u.color}`}>{u.score === 0 ? '0 (BLACKLIST)' : u.score}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-purple-400 hover:text-purple-300 text-xs font-sans">Manage</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500 font-sans">No users found matching "{searchQuery}"</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

// ============================================================================
// MAIN APP ROUTER
// ============================================================================
export default function App() {
  const [currentView, setCurrentView] = useState('login'); // login, Resident, Security, Admin

  const handleLogin = (role) => {
    setCurrentView(role);
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  return (
    <>
      {/* Global styles for custom Tailwind animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseRed { 0%, 100% { box-shadow: 0 0 15px rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 25px rgba(239,68,68,0.7); border-color: rgba(239,68,68,0.9); } }
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out forwards; }
        .animate-pulseRed { animation: pulseRed 2s infinite; }
        .animate-slideInRight { animation: slideInRight 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
      `}</style>

      {currentView === 'login' && <Login onLogin={handleLogin} />}
      {currentView === 'Resident' && <ResidentPortal onLogout={handleLogout} />}
      {currentView === 'Security' && <GuardDashboard onLogout={handleLogout} />}
      {currentView === 'Admin' && <AdminTower onLogout={handleLogout} />}
    </>
  );
}