import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';

const Field = ({ label, name, value, onChange, type = 'text', rows }) => (
  <div>
    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">{label}</label>
    {type === 'image' ? (
      <ImageUploadField name={name} value={value} onChange={onChange} />
    ) : rows ? (
      <textarea name={name} value={value} onChange={onChange} rows={rows} className="input-field resize-none" />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} className="input-field" />
    )}
  </div>
);

const ImageUploadField = ({ name, value, onChange }) => {
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width; let height = img.height; const max = 800;
        if (width > height) { if (width > max) { height *= max / width; width = max; } }
        else { if (height > max) { width *= max / height; height = max; } }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onChange({ target: { name, value: dataUrl } });
        setError('');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex gap-4 items-start bg-dark-3 p-4 rounded-xl border border-white/5">
      {value ? (
        <img src={value} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-white/10 flex-shrink-0" />
      ) : (
        <div className="w-20 h-20 rounded-lg bg-dark-2 flex items-center justify-center text-white/20 border border-white/5 flex-shrink-0">🖼️</div>
      )}
      <div className="flex-1 min-w-0">
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" id={`upload-${name}`} />
        <label htmlFor={`upload-${name}`} className="inline-block px-4 py-2 rounded-lg bg-green-brand/20 text-green-light border border-green-brand/30 text-xs font-display font-bold uppercase tracking-wider cursor-pointer hover:bg-green-brand hover:text-white transition-colors">
          Upload Image
        </label>
        <p className="text-[10px] text-white/30 mt-2 mb-2 leading-tight">Images are automatically resized to save space. You can also paste an existing path below.</p>
        <input type="text" name={name} value={value || ''} onChange={onChange} placeholder="/assets/image.jpg" className="input-field text-xs py-1.5" />
        {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
      </div>
    </div>
  );
};

/* ── Toast ── */
function Toast({ msg }) {
  return msg ? (
    <div className="toast toast-success show">{msg}</div>
  ) : null;
}

/* ── CRUD generic list ── */
function CrudList({ items, fields, onSave, onDelete, newItemTemplate, title }) {
  const [editing, setEditing] = useState(null);  // null = list view, object = edit view
  const [draft, setDraft] = useState(null);

  const startNew = () => { const t = { ...newItemTemplate, id: Date.now() }; setDraft(t); setEditing('new'); };
  const startEdit = item => { setDraft({ ...item }); setEditing(item.id); };
  const cancel = () => { setEditing(null); setDraft(null); };
  const save = () => {
    const updated = editing === 'new'
      ? [...items, draft]
      : items.map(i => i.id === editing ? draft : i);
    onSave(updated);
    cancel();
  };
  const del = id => { if (confirm('Delete this item?')) onSave(items.filter(i => i.id !== id)); };
  const handleChange = e => setDraft(d => ({ ...d, [e.target.name]: e.target.value }));

  if (editing !== null) {
    return (
      <div className="flex flex-col gap-4">
        <h4 className="font-display font-bold text-sm">{editing === 'new' ? `New ${title}` : `Edit ${title}`}</h4>
        {fields.map(f => (
          <Field key={f.name} label={f.label} name={f.name} value={draft[f.name] || ''} onChange={handleChange} type={f.type || 'text'} rows={f.rows} />
        ))}
        <div className="flex gap-3 pt-2">
          <button onClick={save} className="px-5 py-2 rounded-lg bg-green-brand hover:bg-green-light text-white text-sm font-display font-semibold transition-colors">
            Save
          </button>
          <button onClick={cancel} className="px-5 py-2 rounded-lg border border-white/15 text-white/60 hover:text-white text-sm font-display transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display font-bold text-sm">{title} ({items.length})</h4>
        <button onClick={startNew} className="px-4 py-2 rounded-lg bg-green-brand hover:bg-green-light text-white text-xs font-display font-semibold transition-colors">
          + Add New
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/8 bg-dark-3 hover:border-white/15">
            <div className="flex items-center gap-3 min-w-0">
              {item.image ? (
                <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0" />
              ) : item.icon ? (
                <span className="text-xl flex-shrink-0 w-10 h-10 flex items-center justify-center bg-dark-2 rounded-lg">{item.icon}</span>
              ) : item.initials ? (
                <div className="w-10 h-10 rounded-lg bg-green-brand/20 text-green-light flex items-center justify-center text-xs font-display font-bold flex-shrink-0">{item.initials}</div>
              ) : null}
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{item.title || item.name}</div>
                {item.category && <div className="text-xs text-white/40 truncate">{item.category}</div>}
                {item.role && <div className="text-xs text-white/40 truncate">{item.role}</div>}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(item)} className="px-3 py-1.5 rounded-lg border border-white/15 text-xs text-white/60 hover:text-white hover:border-white/30 transition-colors">Edit</button>
              <button onClick={() => del(item.id)} className="px-3 py-1.5 rounded-lg border border-red-500/20 text-xs text-red-400 hover:bg-red-500/10 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-center py-8 text-white/30 text-sm">No items yet. Click + Add New to get started.</div>}
      </div>
    </div>
  );
}

/* ── Section panels ── */
function GlobalSettings({ data, onSave }) {
  const [draft, setDraft] = useState({ ...data });
  const handle = e => setDraft(d => ({ ...d, [e.target.name]: e.target.value }));
  const save = () => onSave('settings', draft);

  const fields = [
    ['companyName','Company Name'], ['legalName','Legal Name'], ['tagline','Tagline'],
    ['established','Year Established'], ['phone1','Phone 1'], ['phone2','Phone 2'],
    ['email','Email'], ['address','Address'], ['linkedin','LinkedIn URL'],
    ['facebook','Facebook URL'], ['instagram','Instagram URL'],
    ['footerDesc','Footer Description'], ['copyrightYear','Copyright Year'],
    ['adminPassword','Admin Password'],
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {fields.map(([name, label]) => (
        <Field key={name} label={label} name={name} value={draft[name] || ''} onChange={handle}
          type={name === 'email' ? 'email' : name === 'adminPassword' ? 'password' : 'text'}
          rows={name === 'footerDesc' || name === 'address' ? 2 : undefined}
        />
      ))}
      <div className="sm:col-span-2">
        <button onClick={save} className="px-6 py-3 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-semibold text-sm transition-colors">
          Save Global Settings
        </button>
      </div>
    </div>
  );
}

function HomeEditor({ data, onSave }) {
  const [draft, setDraft] = useState({ ...data, stats: [...data.stats] });
  const handle = e => setDraft(d => ({ ...d, [e.target.name]: e.target.value }));
  const handleStat = (i, field, val) => {
    const stats = draft.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setDraft(d => ({ ...d, stats }));
  };
  const save = () => onSave('home', draft);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Hero Badge" name="heroBadge" value={draft.heroBadge} onChange={handle} />
        <Field label="Hero Subtitle" name="heroSubtitle" value={draft.heroSubtitle} onChange={handle} />
        <div className="sm:col-span-2">
          <Field label="Hero Description" name="heroDesc" value={draft.heroDesc} onChange={handle} rows={3} />
        </div>
        <Field label="About Section Title" name="aboutTitle" value={draft.aboutTitle} onChange={handle} />
        <div className="sm:col-span-2">
          <Field label="About Desc 1" name="aboutDesc1" value={draft.aboutDesc1} onChange={handle} rows={3} />
        </div>
        <div className="sm:col-span-2">
          <Field label="About Desc 2" name="aboutDesc2" value={draft.aboutDesc2} onChange={handle} rows={3} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-3">Stats (3 cards)</label>
        <div className="grid grid-cols-3 gap-4">
          {draft.stats.map((stat, i) => (
            <div key={stat.id} className="p-4 rounded-xl border border-white/8 bg-dark-3">
              <input className="input-field mb-2 text-center font-display font-bold text-lg" value={stat.number}
                onChange={e => handleStat(i, 'number', e.target.value)} placeholder="16+" />
              <input className="input-field text-center text-sm" value={stat.label}
                onChange={e => handleStat(i, 'label', e.target.value)} placeholder="Label" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={save} className="px-6 py-3 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-semibold text-sm transition-colors w-fit">
        Save Home Page
      </button>
    </div>
  );
}

function AboutEditor({ data, onSave }) {
  const [draft, setDraft] = useState({ ...data });
  const handle = e => setDraft(d => ({ ...d, [e.target.name]: e.target.value }));
  const save = () => onSave('about', draft);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2"><Field label="Vision" name="vision" value={draft.vision} onChange={handle} rows={2} /></div>
        <div className="sm:col-span-2"><Field label="Mission" name="mission" value={draft.mission} onChange={handle} rows={2} /></div>
        <div className="sm:col-span-2"><Field label="Story Paragraph 1" name="story1" value={draft.story1} onChange={handle} rows={4} /></div>
        <div className="sm:col-span-2"><Field label="Story Paragraph 2" name="story2" value={draft.story2} onChange={handle} rows={4} /></div>
        <div className="sm:col-span-2">
          <button onClick={save} className="px-6 py-3 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-semibold text-sm transition-colors">
            Save Story & Vision
          </button>
        </div>
      </div>
      <hr className="border-white/8" />
      <CrudList
        title="Expert Panel Member"
        items={draft.expertPanel}
        onSave={updated => { const next = { ...draft, expertPanel: updated }; setDraft(next); onSave('about', next); }}
        newItemTemplate={{ image: '', name: '', role: '', quals: '', exp: '', isFounder: false }}
        fields={[
          { name: 'image',    label: 'Profile Picture', type: 'image' },
          { name: 'name',     label: 'Full Name'           },
          { name: 'role',     label: 'Role / Title'        },
          { name: 'quals',    label: 'Qualifications'      },
          { name: 'exp',      label: 'Experience (e.g. 16+ Years)' },
        ]}
      />
      <hr className="border-white/8" />
      <CrudList
        title="Design Team Member"
        items={draft.designTeam}
        onSave={updated => { const next = { ...draft, designTeam: updated }; setDraft(next); onSave('about', next); }}
        newItemTemplate={{ initials: '', name: '', role: '', exp: '' }}
        fields={[
          { name: 'initials', label: 'Initials' },
          { name: 'name',     label: 'Name'     },
          { name: 'role',     label: 'Role'     },
          { name: 'exp',      label: 'Experience' },
        ]}
      />
    </div>
  );
}

function ProjectsEditor({ data, onSave }) {
  const [draft, setDraft] = useState({ ...data });
  const handleClients = e => setDraft(d => ({ ...d, clients: { ...d.clients, [e.target.name]: e.target.value } }));
  const handleAudit = (i, val) => {
    const ea = [...draft.energyAudit]; ea[i] = val;
    setDraft(d => ({ ...d, energyAudit: ea }));
  };
  const addAudit = () => setDraft(d => ({ ...d, energyAudit: [...d.energyAudit, ''] }));
  const delAudit = i => setDraft(d => ({ ...d, energyAudit: d.energyAudit.filter((_, idx) => idx !== i) }));
  const save = () => onSave('projects', draft);

  return (
    <div className="flex flex-col gap-8">
      <CrudList
        title="Project"
        items={draft.items}
        onSave={updated => { const next = { ...draft, items: updated }; setDraft(next); onSave('projects', next); }}
        newItemTemplate={{ image: '', category: '', title: '', desc: '', tags: '' }}
        fields={[
          { name: 'image',    label: 'Project Header Image', type: 'image' },
          { name: 'category', label: 'Category'    },
          { name: 'title',    label: 'Project Title' },
          { name: 'desc',     label: 'Description', rows: 3 },
          { name: 'tags',     label: 'Tags (comma separated)' },
        ]}
      />
      <hr className="border-white/8" />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display font-bold text-sm">Energy Audit Items ({draft.energyAudit.length})</h4>
          <button onClick={addAudit} className="px-4 py-2 rounded-lg bg-green-brand hover:bg-green-light text-white text-xs font-display font-semibold transition-colors">+ Add Item</button>
        </div>
        <div className="flex flex-col gap-3">
          {draft.energyAudit.map((item, i) => (
            <div key={i} className="flex gap-3">
              <input value={item} onChange={e => handleAudit(i, e.target.value)} className="input-field flex-1" placeholder="Energy audit item..." />
              <button onClick={() => delAudit(i)} className="px-3 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs transition-colors flex-shrink-0">✕</button>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-white/8" />
      <CrudList
        title="Client Logo"
        items={draft.clientLogos || []}
        onSave={updated => { const next = { ...draft, clientLogos: updated }; setDraft(next); onSave('projects', next); }}
        newItemTemplate={{ name: '', image: '' }}
        fields={[
          { name: 'image', label: 'Client Logo Image', type: 'image' },
          { name: 'name',  label: 'Client Name' },
        ]}
      />
      <hr className="border-white/8" />
      <div>
        <h4 className="font-display font-bold text-sm mb-4">Clients (one per line)</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          {[['developers','Developers & Business'],['architects','Architects'],['contractors','Contractors']].map(([key, lbl]) => (
            <div key={key}>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">{lbl}</label>
              <textarea name={key} value={draft.clients[key]} onChange={handleClients} rows={5} className="input-field resize-none" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={save} className="px-6 py-3 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-semibold text-sm transition-colors w-fit">
        Save Projects
      </button>
    </div>
  );
}

function BlogEditor({ data, onSave }) {
  return (
    <CrudList
      title="Blog Post"
      items={data.posts}
      onSave={updated => onSave('blog', { posts: updated })}
      newItemTemplate={{ image: '', date: new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}), category: '', title: '', excerpt: '', content: '' }}
      fields={[
        { name: 'image',    label: 'Blog Header Image', type: 'image' },
        { name: 'date',     label: 'Date'         },
        { name: 'category', label: 'Category'    },
        { name: 'title',    label: 'Title'        },
        { name: 'excerpt',  label: 'Excerpt (short preview)', rows: 3 },
        { name: 'content',  label: 'Full Content', rows: 6 },
      ]}
    />
  );
}

function ConsultationEditor({ data, onSave }) {
  return (
    <CrudList
      title="Why Choose Us Card"
      items={data.whyCards}
      onSave={updated => onSave('consultation', { whyCards: updated })}
      newItemTemplate={{ icon: '⭐', title: '', desc: '' }}
      fields={[
        { name: 'icon',  label: 'Emoji Icon' },
        { name: 'title', label: 'Card Title' },
        { name: 'desc',  label: 'Description', rows: 3 },
      ]}
    />
  );
}

/* ══════════════════════════════════════════════════════
   MAIN ADMIN PAGE
══════════════════════════════════════════════════════ */
export default function Admin() {
  const { content, updateSection, resetContent } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('mcfew_admin') === '1');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState('settings');
  const [toast, setToast] = useState('');

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = e => {
    e.preventDefault();
    if (pw === content.settings.adminPassword) {
      sessionStorage.setItem('mcfew_admin', '1');
      setLoggedIn(true);
    } else {
      setPwError('Incorrect password. Try mcfew2024');
    }
  };

  const handleSave = (section, data) => {
    updateSection(section, data);
    showToast('✅ Saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Reset ALL content to defaults? This cannot be undone.')) {
      resetContent();
      showToast('🔄 Content reset to defaults.');
    }
  };

  const tabs = [
    { id: 'settings',     icon: '⚙️', label: 'Global Settings' },
    { id: 'home',         icon: '🏠', label: 'Home Page'        },
    { id: 'about',        icon: '👥', label: 'About Us'          },
    { id: 'projects',     icon: '🏗️', label: 'Projects'          },
    { id: 'blog',         icon: '📝', label: 'Blog'              },
    { id: 'consultation', icon: '📞', label: 'Consultation'      },
  ];

  /* ── Login Screen ── */
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-1 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="MCFEW" className="h-14 mx-auto mb-4 rounded-md" />
            <h1 className="font-display font-black text-2xl">Admin Panel</h1>
            <p className="text-white/40 text-sm mt-1">MCFEW Consultants</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-dark-card p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Password</label>
                <input type="password" value={pw} onChange={e => setPw(e.target.value)}
                  className="input-field" placeholder="Enter admin password" autoFocus />
                {pwError && <p className="text-red-400 text-xs mt-2">{pwError}</p>}
              </div>
              <button type="submit"
                className="py-3 rounded-xl bg-green-brand hover:bg-green-light text-white font-display font-bold transition-colors">
                Login →
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-white/20 mt-6">Default password: mcfew2024</p>
        </div>
      </div>
    );
  }

  /* ── Admin Dashboard ── */
  return (
    <div className="min-h-screen flex bg-dark-1 pt-0">
      {/* Sidebar */}
      <aside className="admin-sidebar w-64 flex-shrink-0 border-r border-white/8 flex flex-col fixed top-0 left-0 h-screen z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/8">
          <img src="/logo.png" alt="MCFEW" className="h-9 rounded-sm" />
          <div className="text-xs text-white/30 mt-1 font-display">Admin Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-medium w-full text-left transition-all duration-200
                           ${activeTab === tab.id
                             ? 'bg-green-brand text-white'
                             : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-white/8 flex flex-col gap-2">
          <button onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 w-full transition-all">
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span> Toggle Theme
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full transition-all">
            <span>🔄</span> Reset to Defaults
          </button>
          <button onClick={() => { sessionStorage.removeItem('mcfew_admin'); setLoggedIn(false); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 w-full transition-all">
            <span>🚪</span> Logout
          </button>
          <a href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-green-light hover:bg-green-brand/10 w-full transition-all">
            <span>🌐</span> View Website
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/8">
          <div>
            <h1 className="font-display font-black text-2xl">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-white/40 text-sm mt-0.5">Edit and manage content displayed on your website</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/30 font-display">Changes save to browser storage</div>
          </div>
        </div>

        {/* Content panels */}
        <div className="bg-dark-card rounded-2xl border border-white/8 p-8">
          {activeTab === 'settings'     && <GlobalSettings     data={content.settings}     onSave={handleSave} />}
          {activeTab === 'home'         && <HomeEditor          data={content.home}         onSave={handleSave} />}
          {activeTab === 'about'        && <AboutEditor         data={content.about}        onSave={handleSave} />}
          {activeTab === 'projects'     && <ProjectsEditor      data={content.projects}     onSave={handleSave} />}
          {activeTab === 'blog'         && <BlogEditor          data={content.blog}         onSave={handleSave} />}
          {activeTab === 'consultation' && <ConsultationEditor  data={content.consultation} onSave={handleSave} />}
        </div>
      </main>

      <Toast msg={toast} />
    </div>
  );
}
