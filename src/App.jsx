import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, Database, Home, History, Menu, X, Zap, Shield, TrendingUp, CheckCircle, Blocks, BrainCircuit, Calendar, Filter, Mail, Lock, User, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

export default function IoTBlockchainDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState('login');
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [blockchainData, setBlockchainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (email, password) => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleSignup = (name, email, password) => {
    if (name && email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/history/all', {
        headers: { 'X-API-Key': 'your-static-api-key-here' }
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setHistoryData(data.records || []);
    } catch (err) {
      setError(err.message);
      setHistoryData([
        { id: 'asset_001', hash: '5f4dcc3b5aa765d61d8327deb882cf99', timestamp: new Date().toISOString(), deviceId: 'IoT_Device_01', status: 'verified' },
        { id: 'asset_002', hash: '098f6bcd4621d373cade4e832627b4f6', timestamp: new Date(Date.now() - 3600000).toISOString(), deviceId: 'IoT_Device_02', status: 'verified' },
        { id: 'asset_003', hash: 'e99a18c428cb38d5f260853678922e03', timestamp: new Date(Date.now() - 7200000).toISOString(), deviceId: 'IoT_Device_03', status: 'verified' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockchain = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/blockchain/blocks', {
        headers: { 'X-API-Key': 'your-static-api-key-here' }
      });
      if (!response.ok) throw new Error('Failed to fetch blockchain data');
      const data = await response.json();
      setBlockchainData(data.blocks || []);
    } catch (err) {
      setError(err.message);
      setBlockchainData([
        { blockNumber: 1247, blockId: 'BLK_5f4dcc3b5aa7', transactionId: 'TXN_001_5f4d', timestamp: new Date().toISOString(), transactions: 5, validator: 'Peer0.org1' },
        { blockNumber: 1246, blockId: 'BLK_098f6bcd4621', transactionId: 'TXN_002_098f', timestamp: new Date(Date.now() - 300000).toISOString(), transactions: 3, validator: 'Peer1.org1' },
        { blockNumber: 1245, blockId: 'BLK_e99a18c428cb', transactionId: 'TXN_003_e99a', timestamp: new Date(Date.now() - 600000).toISOString(), transactions: 7, validator: 'Peer0.org2' },
        { blockNumber: 1244, blockId: 'BLK_ab56b4d92b40', transactionId: 'TXN_004_ab56', timestamp: new Date(Date.now() - 900000).toISOString(), transactions: 4, validator: 'Peer1.org2' },
        { blockNumber: 1243, blockId: 'BLK_c81e728d9d4c', transactionId: 'TXN_005_c81e', timestamp: new Date(Date.now() - 1200000).toISOString(), transactions: 6, validator: 'Peer0.org1' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 'history') fetchHistory();
    if (currentPage === 'blockchain') fetchBlockchain();
  }, [currentPage]);

  if (!isLoggedIn) {
    return authPage === 'login' ? <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthPage('signup')} /> : <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setAuthPage('login')} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-950 text-white transition-all duration-300 overflow-hidden shadow-2xl`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-10 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="p-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg">
                <Database className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold">IoT Blockchain</h1>
                <p className="text-xs text-blue-200">Secure Data Pipeline</p>
              </div>
            </div>
            
            <nav className="space-y-3">
              <NavButton icon={<Home className="w-5 h-5" />} label="Dashboard" active={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
              <NavButton icon={<History className="w-5 h-5" />} label="History" active={currentPage === 'history'} onClick={() => setCurrentPage('history')} />
              <NavButton icon={<Blocks className="w-5 h-5" />} label="Blockchain" active={currentPage === 'blockchain'} onClick={() => setCurrentPage('blockchain')} />
              <NavButton icon={<BrainCircuit className="w-5 h-5" />} label="AI Analysis" active={currentPage === 'ai'} onClick={() => setCurrentPage('ai')} />
            </nav>

            <div className="mt-10 p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span className="text-sm font-semibold text-emerald-100">System Status</span>
              </div>
              <p className="text-xs text-emerald-200">All systems operational</p>
            </div>

            <button onClick={handleLogout} className="w-full mt-6 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all duration-200">
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white/70 backdrop-blur-md border-b border-white/50 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:scale-110">
                {sidebarOpen ? <X className="w-6 h-6 text-indigo-700" /> : <Menu className="w-6 h-6 text-indigo-700" />}
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg">
                <Activity className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-semibold">System Active</span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'history' && <HistoryPage data={historyData} loading={loading} error={error} onRefresh={fetchHistory} />}
            {currentPage === 'blockchain' && <BlockchainPage data={blockchainData} loading={loading} error={error} onRefresh={fetchBlockchain} />}
            {currentPage === 'ai' && <AIAnalysisPage />}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function LoginPage({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
              <Database className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">IoT Blockchain</h1>
              <p className="text-sm text-blue-200">Secure Data Pipeline</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-blue-200">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account? <button onClick={onSwitchToSignup} className="text-indigo-600 hover:text-indigo-700 font-bold">Sign Up</button></p>
          </div>
        </div>

        <p className="text-center text-blue-200 text-sm mt-6">© 2024 IoT Blockchain. All rights reserved.</p>
      </div>
    </div>
  );
}

function SignupPage({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSignup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl">
              <Database className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">IoT Blockchain</h1>
              <p className="text-sm text-purple-200">Secure Data Pipeline</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-purple-200">Join us to start monitoring your IoT devices</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
              Create Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Already have an account? <button onClick={onSwitchToLogin} className="text-purple-600 hover:text-purple-700 font-bold">Sign In</button></p>
          </div>
        </div>

        <p className="text-center text-purple-200 text-sm mt-6">© 2024 IoT Blockchain. All rights reserved.</p>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 ${active ? 'bg-white/20 shadow-lg border border-white/30 scale-105' : 'hover:bg-white/10 hover:scale-102'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function HomePage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">IoT Blockchain Dashboard</h2>
          <p className="text-gray-600 mt-2">Real-time monitoring of secure data pipeline</p>
        </div>
        <Zap className="w-12 h-12 text-yellow-500 animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Transactions" value="1,247" icon={<Database className="w-8 h-8" />} gradient="from-blue-500 to-indigo-600" percentage="+12.5%" />
        <StatCard title="Active Devices" value="12" icon={<Activity className="w-8 h-8" />} gradient="from-emerald-500 to-teal-600" percentage="+3" />
        <StatCard title="Anomalies Detected" value="3" icon={<AlertCircle className="w-8 h-8" />} gradient="from-rose-500 to-pink-600" percentage="-2" />
        <StatCard title="Security Score" value="98%" icon={<Shield className="w-8 h-8" />} gradient="from-purple-500 to-indigo-600" percentage="+5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">System Overview</h3>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This dashboard provides real-time monitoring of IoT sensor data that is being securely recorded on the Hyperledger Fabric blockchain. All sensor readings are hashed and stored immutably, ensuring data integrity and traceability.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InfoBox title="MQTT Broker" status="Connected" color="emerald" />
            <InfoBox title="Blockchain Network" status="Running" color="blue" />
            <InfoBox title="AI Detection" status="Active" color="purple" />
            <InfoBox title="Backend API" status="Operational" color="teal" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <QuickStat label="Uptime" value="99.9%" />
            <QuickStat label="Avg Response" value="45ms" />
            <QuickStat label="Data Processed" value="2.4GB" />
            <QuickStat label="Success Rate" value="99.7%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryPage({ data, loading, error, onRefresh }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Blockchain History</h2>
          <p className="text-gray-600 mt-2">Immutable record of all transactions</p>
        </div>
        <button onClick={onRefresh} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-5 flex items-start gap-4 shadow-md">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 font-semibold text-lg">Connection Warning</p>
            <p className="text-amber-700 text-sm mt-1">Unable to fetch data from backend. Displaying mock data for demonstration purposes.</p>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Asset ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Hash</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Device ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center"><div className="flex flex-col items-center gap-3"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p className="text-gray-600 font-medium">Loading blockchain data...</p></div></td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500"><Database className="w-16 h-16 mx-auto mb-3 text-gray-300" /><p className="font-medium">No records found</p></td></tr>
              ) : (
                data.map((record, index) => (
                  <tr key={index} className="hover:bg-indigo-50 transition-all duration-200 group">
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono font-semibold">{record.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono"><span className="inline-block px-3 py-1 bg-gray-100 rounded-lg group-hover:bg-indigo-100 transition-colors">{record.hash.substring(0, 16)}...</span></td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{record.deviceId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(record.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"><CheckCircle className="w-3 h-3" />{record.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BlockchainPage({ data, loading, error, onRefresh }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Blockchain Blocks</h2>
          <p className="text-gray-600 mt-2">Latest blocks added to the chain</p>
        </div>
        <button onClick={onRefresh} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-5 flex items-start gap-4 shadow-md">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 font-semibold text-lg">Connection Warning</p>
            <p className="text-amber-700 text-sm mt-1">Unable to fetch blockchain data. Displaying mock data for demonstration purposes.</p>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Block #</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Block ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Transactions</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Validator</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center"><div className="flex flex-col items-center gap-3"><div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div><p className="text-gray-600 font-medium">Loading blocks...</p></div></td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500"><Blocks className="w-16 h-16 mx-auto mb-3 text-gray-300" /><p className="font-medium">No blocks found</p></td></tr>
              ) : (
                data.map((block, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition-all duration-200 group">
                    <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="text-sm font-bold text-gray-900">#{block.blockNumber}</span></div></td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono"><span className="inline-block px-3 py-1 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors">{block.blockId}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono"><span className="inline-block px-3 py-1 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">{block.transactionId}</span></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">{block.transactions} TXNs</span></td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{block.validator}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(block.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AIAnalysisPage() {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [selectedWeeks, setSelectedWeeks] = useState(2);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    setTimeout(() => {
      setAnalysisData({
        totalRecords: timeRange === 'month' ? selectedMonths * 8640 : selectedWeeks * 2016,
        anomaliesDetected: timeRange === 'month' ? selectedMonths * 12 : selectedWeeks * 3,
        accuracy: '97.8%',
        avgProcessingTime: '23ms',
        topAnomalies: [
          { type: 'Temperature Spike', count: 15, severity: 'High' },
          { type: 'Sensor Malfunction', count: 8, severity: 'Medium' },
          { type: 'Data Drift', count: 5, severity: 'Low' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Analysis</h2>
        <p className="text-gray-600 mt-2">Analyze IoT sensor data for anomalies and patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Analysis Settings</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time Range</label>
              <div className="flex gap-4">
                <button onClick={() => setTimeRange('week')} className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${timeRange === 'week' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Calendar className="w-5 h-5 mx-auto mb-2" />
                  Weekly Analysis
                </button>
                <button onClick={() => setTimeRange('month')} className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${timeRange === 'month' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Calendar className="w-5 h-5 mx-auto mb-2" />
                  Monthly Analysis
                </button>
              </div>
            </div>

            {timeRange === 'month' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Number of Months</label>
                <div className="grid grid-cols-6 gap-3">
                  {[1, 2, 3, 6, 9, 12].map(month => (
                    <button key={month} onClick={() => setSelectedMonths(month)} className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${selectedMonths === month ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {month}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Selected: <span className="font-bold text-purple-600">{selectedMonths} month{selectedMonths > 1 ? 's' : ''}</span></p>
              </div>
            )}

            {timeRange === 'week' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Number of Weeks</label>
                <div className="grid grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 6, 8].map(week => (
                    <button key={week} onClick={() => setSelectedWeeks(week)} className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${selectedWeeks === week ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {week}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Selected: <span className="font-bold text-blue-600">{selectedWeeks} week{selectedWeeks > 1 ? 's' : ''}</span></p>
              </div>
            )}

            <button onClick={runAnalysis} disabled={loading} className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-bold text-lg">
              {loading ? '🔄 Running Analysis...' : '🚀 Run AI Analysis'}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6">Analysis Info</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <p className="text-sm text-purple-100 mb-1">AI Model</p>
              <p className="font-bold text-lg">Isolation Forest</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <p className="text-sm text-purple-100 mb-1">Detection Method</p>
              <p className="font-bold text-lg">Anomaly Detection</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <p className="text-sm text-purple-100 mb-1">Status</p>
              <p className="font-bold text-lg flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>Ready</p>
            </div>
          </div>
        </div>
      </div>

      {analysisData && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50 animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Records</p>
              <p className="text-3xl font-bold text-indigo-700">{analysisData.totalRecords.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Anomalies Found</p>
              <p className="text-3xl font-bold text-rose-700">{analysisData.anomaliesDetected}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-emerald-700">{analysisData.accuracy}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Avg Time</p>
              <p className="text-3xl font-bold text-amber-700">{analysisData.avgProcessingTime}</p>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-800 mb-4">Top Detected Anomalies</h4>
          <div className="space-y-3">
            {analysisData.topAnomalies.map((anomaly, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${anomaly.severity === 'High' ? 'bg-red-500' : anomaly.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <div>
                    <p className="font-bold text-gray-800">{anomaly.type}</p>
                    <p className="text-sm text-gray-600">Severity: {anomaly.severity}</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold">{anomaly.count} cases</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Footer() {
return (
<footer className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-t border-indigo-800/50">
{/* Moving Text Banner */}
<div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-2 overflow-hidden">
<div className="animate-marquee whitespace-nowrap flex">
<span className="mx-8 text-sm font-semibold">🔐 Secure IoT Pipeline</span>
<span className="mx-8 text-sm font-semibold">⛓️ Blockchain Verified</span>
<span className="mx-8 text-sm font-semibold">🤖 AI-Powered Detection</span>
<span className="mx-8 text-sm font-semibold">📊 Real-time Monitoring</span>
<span className="mx-8 text-sm font-semibold">🔐 Secure IoT Pipeline</span>
<span className="mx-8 text-sm font-semibold">⛓️ Blockchain Verified</span>
<span className="mx-8 text-sm font-semibold">🤖 AI-Powered Detection</span>
<span className="mx-8 text-sm font-semibold">📊 Real-time Monitoring</span>
</div>
</div>

{/* Compact Footer Content */}
<div className="max-w-7xl mx-auto px-6 py-4">
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
{/* Logo & Info */}
<div className="flex items-center gap-3">
<div className="p-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg">
<Database className="w-5 h-5" />
</div>
<div>
<h3 className="font-bold text-sm">IoT Blockchain Dashboard</h3>
<p className="text-xs text-slate-400">Enterprise-grade secure pipeline</p>
</div>
</div>

{/* Team */}
<div className="flex items-center gap-6 text-xs text-slate-300">
<span className="flex items-center gap-1"><User className="w-3 h-3" /> Vineet</span>
<span className="flex items-center gap-1"><User className="w-3 h-3" /> Priyanshu</span>
<span className="flex items-center gap-1"><User className="w-3 h-3" /> Mohit</span>
<span className="flex items-center gap-1"><User className="w-3 h-3" /> Prateek</span>
</div>

{/* Social Links */}
<div className="flex items-center gap-3">
<a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110">
<Github className="w-4 h-4" />
</a>
<a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110">
<Twitter className="w-4 h-4" />
</a>
<a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110">
<Linkedin className="w-4 h-4" />
</a>
</div>
</div>

{/* Copyright */}
<div className="mt-3 pt-3 border-t border-indigo-800/50 text-center text-xs text-slate-400">
<p>© 2024 IoT Blockchain. Built with React, Tailwind CSS & Hyperledger Fabric.</p>
</div>
</div>
</footer>
);
}

function StatCard({ title, value, icon, gradient, percentage }) {
return (
<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50 group">
<div className="flex items-start justify-between mb-4">
<div className="flex-1">
<p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
<p className="text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-200">{value}</p>
{percentage && <span className={`text-xs font-semibold mt-2 inline-block ${percentage.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{percentage} from last week</span>}
</div>
<div className={`bg-gradient-to-br ${gradient} text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>{icon}</div>
</div>
</div>
);
}

function InfoBox({ title, status, color }) {
const colorClasses = {
emerald: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100',
blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
teal: 'border-teal-200 bg-teal-50 hover:bg-teal-100'
};
const statusColors = {
emerald: 'bg-emerald-500',
blue: 'bg-blue-500',
purple: 'bg-purple-500',
teal: 'bg-teal-500'
};

return (
<div className={`border-2 ${colorClasses[color]} rounded-xl p-4 transition-all duration-200 hover:scale-105`}>
<div className="flex items-center justify-between">
<span className="text-sm font-bold text-gray-700">{title}</span>
<div className="flex items-center gap-2">
<div className={`w-2 h-2 ${statusColors[color]} rounded-full animate-pulse`}></div>
<span className="text-xs font-semibold text-gray-600">{status}</span>
</div>
</div>
</div>
);
}

function QuickStat({ label, value }) {
return (
<div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
<span className="text-sm text-blue-100 font-medium">{label}</span>
<span className="text-lg font-bold">{value}</span>
</div>
);
}