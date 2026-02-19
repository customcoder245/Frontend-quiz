import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Filter,
  Download,
  MoreVertical,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

// --- Types ---
interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  questions: string;
  selectedOptions: string;
  date: string;
}

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'submissions' | 'questions'>('analytics');

  // --- Questions CRUD State ---
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: 'How familiar are you with the Mediterranean Diet?', type: 'single', options: ['I know it pretty well', 'I know the basics', 'I have heard of it', 'I know nothing about it'] },
    { id: '2', text: 'What is your main goal right now?', type: 'single', options: ['Improve my health', 'Lose weight', 'Feel more confident', 'Save time on meal prep'] },
    { id: '3', text: 'What is your goal weight?', type: 'single', options: ['140 lbs', '150 lbs', '160 lbs', '170+ lbs'] },
  ]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // --- Submission Data ---
  const submissionData = useMemo<Submission[]>(() => [
    { id: 'S1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', gender: 'Male', questions: 'How familiar are you with the Mediterranean Diet?', selectedOptions: 'I know it pretty well', date: '2026-02-18' },
    { id: 'S2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', gender: 'Female', questions: 'What is your main goal right now?', selectedOptions: 'Improve my health', date: '2026-02-18' },
    { id: 'S3', name: 'David Lee', email: 'david@example.com', phone: '+1122334455', gender: 'Male', questions: 'What is your goal weight?', selectedOptions: '160 lbs', date: '2026-02-17' },
    { id: 'S4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1444556677', gender: 'Female', questions: 'What is your main goal right now?', selectedOptions: 'Feel more confident', date: '2026-02-17' },
    { id: 'S5', name: 'Robert White', email: 'robert@example.com', phone: '+1555443322', gender: 'Male', questions: 'How familiar are you with the Mediterranean Diet?', selectedOptions: 'I’ve tried it before', date: '2026-02-16' },
    { id: 'S6', name: 'Lucy Green', email: 'lucy@example.com', phone: '+1230987654', gender: 'Female', questions: 'Stubborn weight gain symptoms?', selectedOptions: '⚖️ Stubborn weight gain', date: '2026-02-16' },
  ], []);

  // --- Submissions Table Config ---
  const columns = useMemo(() => [
    {
      Header: 'User', accessor: (row: Submission) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#1a1a1b]">{row.name}</span>
          <span className="text-[11px] text-black/40">{row.email}</span>
        </div>
      ), id: 'user'
    },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Last Answer', accessor: 'selectedOptions' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Actions', accessor: () => <MoreVertical className="w-4 h-4 text-black/20 cursor-pointer" />, id: 'actions' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    canNextPage,
    canPreviousPage,
    pageCount,
    nextPage,
    previousPage
  } = useTable<Submission>({ columns, data: submissionData, initialState: { pageIndex: 0, pageSize: 5 } }, useGlobalFilter, usePagination);

  // --- Handlers ---
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');

  const handleSaveQuestion = () => {
    if (!newQuestionText.trim()) return;

    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? {
        ...q,
        text: newQuestionText,
        options: newQuestionOptions.split(',').map(o => o.trim()).filter(Boolean)
      } : q));
    } else {
      const newQ: Question = {
        id: Math.random().toString(36).substr(2, 9),
        text: newQuestionText,
        type: 'single',
        options: newQuestionOptions.split(',').map(o => o.trim()).filter(Boolean)
      };
      setQuestions([...questions, newQ]);
    }

    closeModal();
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setNewQuestionText(q.text);
    setNewQuestionOptions(q.options.join(', '));
    setIsAddingQuestion(true);
  };

  const closeModal = () => {
    setIsAddingQuestion(false);
    setEditingQuestion(null);
    setNewQuestionText('');
    setNewQuestionOptions('');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1a1a1b]">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-[#1a1a1b] text-white flex flex-col fixed h-full z-20">
        <div className="p-8">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto brightness-0 invert" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          <SidebarLink
            icon={<ClipboardList size={20} />}
            label="Submissions"
            active={activeTab === 'submissions'}
            onClick={() => setActiveTab('submissions')}
          />
          <SidebarLink
            icon={<Settings size={20} />}
            label="Manage Quiz"
            active={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          />
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs">AD</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Admin User</span>
              <span className="text-[10px] opacity-40">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-black/5 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-xl font-black capitalize tracking-tight">{activeTab}</h1>
            <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Mediterranean Plan Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20 w-4 h-4" />
              <input
                type="text"
                placeholder="Global search..."
                className="pl-10 pr-4 py-2 bg-[#f4f4f5] rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
              />
            </div>
            <Button className="rounded-full bg-primary h-10 w-10 p-0 flex items-center justify-center">
              <Plus size={20} />
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* --- Analytics Tab --- */}
          {activeTab === 'analytics' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Users className="text-primary" />} label="Total Users" value="127,458" trend="+12.5%" />
                <StatCard icon={<TrendingUp className="text-blue-500" />} label="Conversion" value="8.2%" trend="+2.1%" />
                <StatCard icon={<ClipboardList className="text-orange-500" />} label="Submissions" value="2,475" trend="+5.4%" />
                <StatCard icon={<CheckCircle className="text-green-500" />} label="Quiz Completions" value="94%" trend="+0.8%" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black">Recent Growth</h3>
                      <Filter className="w-4 h-4 text-black/20" />
                    </div>
                    <div className="h-64 bg-[#f8f9fa] rounded-2xl flex items-end justify-between px-8 py-4 gap-2">
                      {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 100].map((h, i) => (
                        <div key={i} className="w-full bg-primary/10 rounded-t-lg relative group transition-all hover:bg-primary" style={{ height: `${h}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a1b] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl">
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-lg font-black">Gender Split</h3>
                    <div className="space-y-6 pt-4">
                      <GenderProgress label="Female" percentage={68} color="bg-primary" />
                      <GenderProgress label="Male" percentage={28} color="bg-[#1a1a1b]" />
                      <GenderProgress label="Other" percentage={4} color="bg-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* --- Submissions Tab --- */}
          {activeTab === 'submissions' && (
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="p-8 border-b border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-black">Latest Submissions</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">Live</span>
                  </div>
                  <Button variant="outline" className="rounded-full border-black/5 text-[12px] font-bold h-10 px-6 flex items-center gap-2">
                    <Download size={14} /> Export CSV
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table {...getTableProps()} className="w-full text-left">
                    <thead>
                      {headerGroups.map((hg: any) => (
                        <tr {...hg.getHeaderGroupProps()} key={hg.id} className="bg-[#fcfcfc] border-b border-black/5">
                          {hg.headers.map((col: any) => (
                            <th {...col.getHeaderProps()} key={col.id} className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-black/30">
                              {col.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row: any) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} key={row.id} className="border-b border-black/5 hover:bg-black/[0.01] transition-colors group">
                            {row.cells.map((cell: any) => (
                              <td {...cell.getCellProps()} key={cell.column.id} className="px-8 py-6 text-sm font-medium">
                                {cell.render('Cell')}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-8 flex items-center justify-between bg-[#fcfcfc]">
                  <div className="text-[12px] font-bold text-black/30">
                    Showing {page.length} of {submissionData.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={previousPage} disabled={!canPreviousPage} variant="outline" className="h-10 w-10 p-0 rounded-full border-black/5">
                      <ChevronRight className="rotate-180 w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1 font-bold text-sm px-4">
                      {pageIndex + 1} / {pageCount}
                    </div>
                    <Button onClick={nextPage} disabled={!canNextPage} variant="outline" className="h-10 w-10 p-0 rounded-full border-black/5">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* --- Questions Manager Tab --- */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-black">All Quiz Questions</h3>
                  <span className="text-[11px] font-black bg-black text-white px-2 py-0.5 rounded uppercase">{questions.length} Total</span>
                </div>
                <Button onClick={() => setIsAddingQuestion(true)} className="rounded-full bg-primary px-8 font-black flex items-center gap-2 h-[55px]">
                  <Plus size={20} /> Add New Question
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {questions.map((q, idx) => (
                  <Card key={q.id} className="border-none shadow-sm rounded-3xl hover:shadow-md transition-all group overflow-hidden">
                    <CardContent className="p-0 flex items-stretch">
                      <div className="w-16 bg-[#1a1a1b] flex items-center justify-center text-white font-black text-lg">
                        {idx + 1}
                      </div>
                      <div className="flex-1 p-8 flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">{q.type} choice</span>
                            <h4 className="text-lg font-bold">{q.text}</h4>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {q.options.map((opt, i) => (
                              <span key={i} className="text-[11px] px-3 py-1 bg-[#f4f4f5] rounded-full font-bold text-black/40 border border-black/5">
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            onClick={() => openEditModal(q)}
                            variant="outline"
                            className="h-10 w-10 p-0 rounded-full border-black/5 hover:bg-blue-50 hover:text-blue-500"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteQuestion(q.id)}
                            variant="outline"
                            className="h-10 w-10 p-0 rounded-full border-black/5 hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- Add/Edit Question Modal Placeholder (Simulated) --- */}
      {isAddingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-[600px] border-none shadow-2xl rounded-[40px] overflow-hidden">
            <CardContent className="p-12 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">{editingQuestion ? 'Edit Question' : 'Add New Question'}</h3>
                <Button onClick={closeModal} variant="ghost" className="rounded-full p-2 h-10 w-10">
                  <X />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-black/30 tracking-widest pl-2">Question Title</label>
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Enter your question text..."
                    className="w-full h-16 px-6 bg-[#f4f4f5] rounded-3xl border-none focus:ring-2 focus:ring-primary/20 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-black/30 tracking-widest pl-2">Options (Comma separated)</label>
                  <textarea
                    value={newQuestionOptions}
                    onChange={(e) => setNewQuestionOptions(e.target.value)}
                    placeholder="Option 1, Option 2, ..."
                    className="w-full h-32 p-6 bg-[#f4f4f5] rounded-3xl border-none focus:ring-2 focus:ring-primary/20 font-bold resize-none"
                  />
                </div>

                <div className="flex grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-3xl border-2 border-primary bg-primary/5 flex items-center justify-center gap-2 cursor-pointer transition-all">
                    <div className="w-4 h-4 rounded-full border-4 border-primary bg-white"></div>
                    <span className="font-bold text-sm">Single Choice</span>
                  </div>
                  <div className="p-4 rounded-3xl border-2 border-black/5 bg-[#fcfcfc] flex items-center justify-center gap-2 cursor-pointer hover:border-black/10 transition-all opacity-40">
                    <div className="w-4 h-4 rounded-full border border-black/20 bg-white"></div>
                    <span className="font-bold text-sm">Multiple Choice</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button onClick={closeModal} variant="outline" className="flex-1 h-[65px] rounded-full border-black/5 font-bold">Cancel</Button>
                <Button onClick={handleSaveQuestion} className="flex-1 h-[65px] rounded-full bg-primary font-bold">
                  {editingQuestion ? 'Update' : 'Save'} Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// --- Helper Components ---

const SidebarLink = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-4 px-6 py-4 cursor-pointer transition-all rounded-2xl
      ${active
        ? 'bg-primary text-white shadow-lg shadow-primary/20'
        : 'text-white/40 hover:bg-white/5 hover:text-white'}
    `}
  >
    <div className={active ? 'scale-110 duration-300' : ''}>{icon}</div>
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
  </div>
);

const StatCard = ({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) => (
  <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 bg-white">
    <CardContent className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-[#f8f9fa] rounded-2xl">
          {icon}
        </div>
        <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-black/30 tracking-widest">{label}</p>
        <h2 className="text-2xl font-black mt-1 tracking-tight">{value}</h2>
      </div>
    </CardContent>
  </Card>
);

const GenderProgress = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-black tracking-widest uppercase">
      <span>{label}</span>
      <span className="text-black/30">{percentage}%</span>
    </div>
    <div className="h-3 bg-[#f4f4f5] rounded-full overflow-hidden flex">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export default Dashboard;