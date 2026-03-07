
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, FolderOpen, Filter, X, Eye, Lock, ShieldCheck, LogOut, Trash2, Edit3, Upload, ExternalLink, Globe, Link as LinkIcon, Sparkles, CheckCircle2, Database, Terminal, Play, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import { INITIAL_PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const [filter, setFilter] = useState<'All' | 'Web' | 'App' | 'Graphics'>('All');
  const [showUploader, setShowUploader] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        // Map database fields to Project interface
        const mappedData = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          imageUrl: item.image_url,
          link: item.live_link,
          category: item.category
        }));
        setProjects(mappedData);
      } else {
        setFetchError('Failed to load portfolio items from the server.');
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setFetchError('Network error: Could not reach the server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newCat, setNewCat] = useState<'Web' | 'App' | 'Graphics'>('Web');
  const [newImageBase64, setNewImageBase64] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // SQL Explorer State
  const [activeTab, setActiveTab] = useState<'Portfolio' | 'SQL'>('Portfolio');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM portfolio LIMIT 10;');
  const [sqlResult, setSqlResult] = useState<any>(null);
  const [sqlError, setSqlError] = useState('');
  const [isSqlRunning, setIsSqlRunning] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);

  const fetchDbStatus = async () => {
    try {
      const response = await fetch('/api/db/status');
      if (response.ok) {
        setDbStatus(await response.json());
      }
    } catch (err) {
      console.error('Failed to fetch DB status');
    }
  };

  useEffect(() => {
    if (isAdmin && activeTab === 'SQL') {
      fetchDbStatus();
    }
  }, [isAdmin, activeTab]);

  const runSqlQuery = async () => {
    setIsSqlRunning(true);
    setSqlError('');
    setSqlResult(null);
    try {
      const response = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sqlQuery, password: 'admin123' })
      });
      const data = await response.json();
      if (response.ok) {
        setSqlResult(data);
        fetchDbStatus(); // Refresh status after query
      } else {
        setSqlError(data.error || 'Failed to execute query');
      }
    } catch (err) {
      setSqlError('Network error occurred. The server might be restarting or unreachable.');
    } finally {
      setIsSqlRunning(false);
    }
  };

  const handleReseed = async () => {
    if (!window.confirm('This will DELETE ALL PORTFOLIO DATA and restore defaults. Proceed?')) return;
    
    try {
      const response = await fetch('/api/db/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'admin123' })
      });
      if (response.ok) {
        alert('Database re-seeded successfully.');
        fetchProjects();
        fetchDbStatus();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Network error occurred during re-seeding.');
    }
  };

  // Persist admin state for the session
  useEffect(() => {
    const adminStatus = sessionStorage.getItem('cloudone_admin');
    if (adminStatus === 'true') setIsAdmin(true);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('cloudone_admin', 'true');
      setShowLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('cloudone_admin');
    setShowUploader(false);
    setEditingProject(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200; 
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setNewImageBase64(dataUrl);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDesc('');
    setNewLink('');
    setNewImageBase64('');
    setEditingProject(null);
    setShowUploader(false);
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const projectData = {
      title: newTitle || 'Untitled Project',
      description: newDesc || 'Project engineered by Cloud One Technologies Dubai.',
      image_url: newImageBase64 || `https://placehold.co/1200x1200/F1F5F9/1F4E79?text=${encodeURIComponent(newTitle || 'Project')}`,
      live_link: newLink || '#',
      category: newCat
    };

    try {
      if (editingProject) {
        const response = await fetch(`/api/portfolio/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
        if (response.ok) {
          await fetchProjects();
          resetForm();
        } else {
          const data = await response.json();
          alert(`Failed to update project: ${data.error || 'Unknown error'}`);
        }
      } else {
        const response = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
        if (response.ok) {
          await fetchProjects();
          resetForm();
        } else {
          const data = await response.json();
          alert(`Failed to add project: ${data.error || 'Unknown error'}. This might be due to a large image file.`);
        }
      }
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Network error: Failed to save project. Please try again.');
    }
  };

  const handleEditClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setNewTitle(project.title);
    setNewDesc(project.description);
    setNewLink(project.link);
    setNewCat(project.category);
    setNewImageBase64(project.imageUrl);
    setShowUploader(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        const response = await fetch(`/api/portfolio/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchProjects();
          if (editingProject?.id === id) resetForm();
        }
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="bg-[#FDFDFE] min-h-screen py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6 md:gap-8 animate-reveal">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Selected <span className="text-gradient">Works.</span></h1>
            <p className="text-slate-500 font-medium text-base md:text-lg">Where high-end design meets Dubai's digital ambition.</p>
          </div>

          {isAdmin ? (
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={() => {
                  if (showUploader && editingProject) {
                    resetForm();
                  } else {
                    setShowUploader(!showUploader);
                  }
                }}
                className={`flex-grow md:flex-none flex items-center justify-center px-8 py-4 font-black rounded-3xl transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest ${
                  showUploader ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {showUploader ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {showUploader ? 'Close Console' : 'Upload Work'}
              </button>
              <button
                onClick={handleLogout}
                className="p-4 bg-red-50 text-red-600 rounded-3xl hover:bg-red-100 transition-all border border-red-100"
                title="Admin Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-full flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#1F4E79]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Portfolio</span>
              </div>
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-6 md:pb-8 mb-8 md:mb-12 animate-reveal [animation-delay:100ms]">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 shrink-0">
             <Filter size={18} className="text-slate-400" />
          </div>
          {['All', 'Web', 'App', 'Graphics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 md:px-8 py-3 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all shrink-0 active:scale-95 ${
                filter === cat 
                  ? 'bg-[#1F4E79] text-white shadow-xl shadow-blue-200/50' 
                  : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Admin Dashboard UI */}
        {isAdmin && showUploader && (
          <div className="mb-16 p-6 md:p-12 bg-white rounded-[40px] md:rounded-[56px] shadow-2xl border border-slate-100 animate-reveal">
            <div className="flex items-center justify-between mb-10">
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('Portfolio')}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'Portfolio' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  <FolderOpen size={14} /> Portfolio Manager
                </button>
                <button 
                  onClick={() => setActiveTab('SQL')}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'SQL' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  <Terminal size={14} /> SQL Explorer
                </button>
              </div>
              <h2 className="hidden md:flex text-2xl font-black text-slate-900 items-center">
                {activeTab === 'Portfolio' ? (
                  <><FolderOpen className="mr-4 text-[#34C1E5]" /> {editingProject ? 'Update Project' : 'Management Console'}</>
                ) : (
                  <><Database className="mr-4 text-[#34C1E5]" /> SQL Engine</>
                )}
              </h2>
            </div>

            {activeTab === 'Portfolio' ? (
              <form onSubmit={handleAddOrUpdateProject} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* ... existing form ... */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luxury Real Estate"
                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-900"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Category</label>
                  <select
                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                  >
                    <option value="Web">Web Development</option>
                    <option value="App">Mobile App</option>
                    <option value="Graphics">Graphics & Branding</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Display Media</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-[68px] border-2 border-dashed rounded-3xl flex items-center px-6 cursor-pointer transition-all ${newImageBase64 ? 'border-[#34C1E5] bg-blue-50/30' : 'border-slate-200 bg-slate-50 hover:border-[#1F4E79]'}`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {newImageBase64 ? (
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={newImageBase64} className="w-10 h-10 object-cover rounded-lg" alt="Preview" />
                        <span className="text-xs font-bold text-[#1F4E79] truncate">{editingProject ? 'Replace Existing Media' : 'Optimized Image Loaded'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Upload size={18} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-400">Choose Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3 lg:col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Live URL (Optional)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full pl-14 pr-8 py-5 rounded-3xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-900"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Case Study / Description</label>
                  <textarea
                    rows={2}
                    className="w-full mt-3 px-8 py-5 rounded-3xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-900 resize-none"
                    placeholder="Describe the solution engineered by Cloud One Technologies..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3 flex justify-end gap-4">
                  {editingProject && (
                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="px-10 py-6 bg-slate-100 text-slate-500 font-black rounded-3xl uppercase tracking-widest text-xs active:scale-95 hover:bg-slate-200 transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button type="submit" className="px-16 py-6 bg-[#1F4E79] text-white font-black rounded-3xl uppercase tracking-widest text-xs shadow-2xl active:scale-95 hover:bg-[#153450] transition-colors">
                    {editingProject ? 'Save Changes' : 'Publish to Gallery'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Database Status Bar */}
                {dbStatus && (
                  <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100 animate-reveal">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                      <Database size={14} className="text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status:</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{dbStatus.status}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                      <FolderOpen size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tables:</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{dbStatus.tables?.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                      <Sparkles size={14} className="text-amber-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Records:</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{dbStatus.records}</span>
                    </div>
                    <button 
                      onClick={handleReseed}
                      className="ml-auto px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors border border-red-100"
                    >
                      Reset Database
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Raw SQL Query</label>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      <Database size={12} /> SQLite 3.x
                    </div>
                  </div>
                  <div className="relative group">
                    <textarea
                      rows={4}
                      className="w-full px-8 py-6 rounded-3xl border border-slate-100 bg-slate-900 text-emerald-400 font-mono text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none shadow-inner"
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                    />
                    <button 
                      onClick={runSqlQuery}
                      disabled={isSqlRunning}
                      className="absolute bottom-6 right-6 px-6 py-3 bg-emerald-500 text-white font-black rounded-2xl flex items-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-xl"
                    >
                      {isSqlRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Play size={14} fill="currentColor" />}
                      Run Query
                    </button>
                  </div>
                </div>

                {sqlError && (
                  <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-4 text-red-600 animate-reveal">
                    <AlertCircle className="shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-black uppercase tracking-widest text-[10px] mb-1">Execution Error</p>
                      <p className="font-mono text-xs">{sqlError}</p>
                    </div>
                  </div>
                )}

                {sqlResult && (
                  <div className="space-y-4 animate-reveal">
                    <div className="flex items-center justify-between px-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Query Result</h4>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        {Array.isArray(sqlResult) ? `${sqlResult.length} Rows Returned` : 'Command Executed'}
                      </span>
                    </div>
                    <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                      <div className="max-h-[400px] overflow-auto no-scrollbar">
                        {Array.isArray(sqlResult) ? (
                          sqlResult.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-100/50 border-b border-slate-100">
                                  {Object.keys(sqlResult[0]).map(key => (
                                    <th key={key} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sqlResult.map((row, i) => (
                                  <tr key={i} className="border-b border-slate-100/50 hover:bg-white transition-colors">
                                    {Object.values(row).map((val: any, j) => (
                                      <td key={j} className="px-6 py-4 font-mono text-xs text-slate-600 truncate max-w-[200px]" title={String(val)}>
                                        {val === null ? <span className="text-slate-300 italic">null</span> : String(val)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="p-12 text-center text-slate-400 font-medium">Query returned no results.</div>
                          )
                        ) : (
                          <div className="p-12 text-center">
                             <CheckCircle2 className="mx-auto w-12 h-12 text-emerald-500 mb-4" />
                             <p className="text-slate-900 font-black uppercase tracking-widest text-xs">{sqlResult.message}</p>
                             {sqlResult.result && <p className="text-slate-400 text-[10px] mt-2 font-mono">Changes: {sqlResult.result.changes} | LastID: {sqlResult.result.lastID}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse">
            <div className="w-16 h-16 border-4 border-[#34C1E5] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Ecosystem...</p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-32 border-2 border-dashed border-red-100 rounded-[48px] bg-red-50/30">
            <AlertCircle className="mx-auto w-16 h-16 text-red-200 mb-6" />
            <h3 className="text-xl font-black text-slate-900 mb-2">Connection Error</h3>
            <p className="text-slate-400 font-medium">{fetchError}</p>
            <button 
              onClick={fetchProjects}
              className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 animate-reveal">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="app-card group flex flex-col h-full overflow-hidden border-none shadow-sm relative cursor-pointer"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-[20] flex gap-2">
                    <button
                      onClick={(e) => handleEditClick(e, project)}
                      className="w-10 h-10 bg-white/95 rounded-full shadow-lg text-[#1F4E79] flex items-center justify-center hover:bg-[#1F4E79] hover:text-white transition-all transform active:scale-90 border border-slate-100"
                      title="Edit Project"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(e, project.id)}
                      className="w-10 h-10 bg-white/95 rounded-full shadow-lg text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform active:scale-90 border border-slate-100"
                      title="Delete Project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
                
                <div className="relative overflow-hidden aspect-[4/5] bg-slate-100">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                     <div className="bg-white/20 backdrop-blur-xl p-6 rounded-full border border-white/30 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                        <Eye className="w-10 h-10 text-white" />
                     </div>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/95 rounded-xl text-[8px] font-black text-slate-900 uppercase tracking-widest shadow-sm">{project.category}</span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#1F4E79] transition-colors tracking-tight">{project.title}</h3>
                  <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-8">{project.description}</p>
                  <div className="pt-8 mt-auto border-t border-slate-50">
                    <span className="inline-flex items-center text-[#1F4E79] font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-[48px]">
            <FolderOpen className="mx-auto w-16 h-16 text-slate-200 mb-6" />
            <h3 className="text-xl font-black text-slate-900 mb-2">No Projects Found</h3>
            <p className="text-slate-400 font-medium">The digital gallery is currently being curated.</p>
          </div>
        )}

        {/* Smooth Expansion Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 bg-slate-950/90 backdrop-blur-2xl transition-all duration-500 animate-in fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="w-full max-w-6xl bg-white rounded-[40px] md:rounded-[64px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[85vh] transition-all duration-500 animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-[310] w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:text-slate-900 hover:bg-white transition-all flex items-center justify-center shadow-2xl active:scale-90"
              >
                <X size={28} strokeWidth={2.5} />
              </button>
              
              {/* Left Side: Immersive Visual */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-100 shrink-0 overflow-hidden group">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <span className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-2xl">
                    Project Visual
                  </span>
                </div>
              </div>
              
              {/* Right Side: Detailed Narrative */}
              <div className="p-8 md:p-20 flex flex-col overflow-y-auto no-scrollbar custom-scrollbar w-full">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-[#1F4E79]/5 text-[#1F4E79]">
                      <Sparkles size={14} className="mr-2 text-[#34C1E5]" />
                      Case Study
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-4">
                      {selectedProject.title}
                    </h2>
                    <div className="w-24 h-2 bg-[#34C1E5] rounded-full"></div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8 border-b border-slate-100 pb-10">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</p>
                        <p className="text-lg font-black text-slate-900">{selectedProject.category} Solutions</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Location</p>
                        <p className="text-lg font-black text-slate-900">Dubai, UAE</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Project Narrative</h4>
                      <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-[#1F4E79] pl-8 py-2 bg-slate-50/50 rounded-r-3xl">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="space-y-6 pt-6">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Technical Details</h4>
                      <p className="text-base text-slate-500 leading-relaxed font-medium">
                        This project exemplifies the Cloud One commitment to excellence. Engineered specifically for the Middle Eastern market, we utilized high-performance frameworks to ensure sub-second latency and maximum security, all wrapped in a world-class visual identity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-12 mt-12 border-t border-slate-100 flex flex-col sm:flex-row gap-6">
                    {selectedProject.link && selectedProject.link !== '#' && (
                      <a 
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-12 py-6 bg-[#1F4E79] text-white font-black rounded-3xl shadow-2xl shadow-blue-900/30 hover:bg-[#153450] transition-all active:scale-95 text-xs uppercase tracking-widest group"
                      >
                        Visit Live Platform <ExternalLink className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                    
                    <Link 
                      to="/contact"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex items-center justify-center px-12 py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all text-xs uppercase tracking-widest shadow-xl active:scale-95"
                    >
                      Inquire for Quote
                    </Link>
                  </div>
                </div>
                
                <div className="mt-20 pt-10 border-t border-slate-100 flex items-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1F4E79] border border-slate-100">
                    <Globe size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cloud One Technologies</p>
                    <p className="text-xs font-bold text-slate-900">Engineering Dubai's Future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Login UI */}
        {showLogin && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl transition-opacity duration-300"
            onClick={() => setShowLogin(false)}
          >
            <div 
              className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl relative animate-reveal" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowLogin(false)} 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 p-2"
              >
                <X size={24} />
              </button>
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-blue-50 rounded-[28px] flex items-center justify-center text-[#1F4E79] mx-auto mb-6 shadow-sm"><Lock size={36} /></div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Management Access</h3>
                <p className="text-slate-400 text-xs font-medium mt-2">Enter credentials to modify the ecosystem</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="password" 
                  autoFocus 
                  required 
                  placeholder="Admin Access Token" 
                  className="w-full px-8 py-5 rounded-3xl border border-slate-100 bg-slate-50 text-center text-xl font-black outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                {error && <p className="text-red-500 text-[10px] font-black uppercase text-center tracking-widest">{error}</p>}
                <button type="submit" className="w-full py-6 bg-[#1F4E79] text-white font-black rounded-3xl shadow-xl uppercase tracking-widest text-xs active:scale-95 transition-transform">Authorize</button>
              </form>
            </div>
          </div>
        )}

        {/* Subtle Admin Trigger */}
        {!isAdmin && (
          <div className="mt-24 flex justify-center pb-20">
            <button 
              onClick={() => setShowLogin(true)} 
              className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 hover:text-slate-400 transition-colors"
            >
              Management Console
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
