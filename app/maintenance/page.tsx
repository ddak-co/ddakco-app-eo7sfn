'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';

interface Maintenance {
  id: string;
  vehicleId: string;
  type: string;
  scheduledDate: string;
  completed: boolean;
  content: string;
}

const DEMO_MAINTENANCES: Maintenance[] = [
  {
    id: '1',
    vehicleId: '1',
    type: '정기점검',
    scheduledDate: '2024-02-15',
    completed: false,
    content: '6개월 정기점검',
  },
  {
    id: '2',
    vehicleId: '1',
    type: '타이어 교체',
    scheduledDate: '2024-03-20',
    completed: false,
    content: '계절 타이어 교체',
  },
  {
    id: '3',
    vehicleId: '1',
    type: '오일 교환',
    scheduledDate: '2024-01-10',
    completed: true,
    content: '엔진 오일 교환',
  },
];

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>(DEMO_MAINTENANCES);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.type || !formData.scheduledDate) {
      alert('점검 종류와 날짜를 입력해주세요.');
      return;
    }

    const newMaintenance: Maintenance = {
      id: Date.now().toString(),
      vehicleId: '1',
      type: formData.type,
      scheduledDate: formData.scheduledDate,
      completed: false,
      content: formData.content,
    };

    setMaintenances([newMaintenance, ...maintenances]);
    setFormData({
      type: '',
      scheduledDate: new Date().toISOString().split('T')[0],
      content: '',
    });
    setShowForm(false);
  };

  const toggleComplete = (id: string) => {
    setMaintenances(
      maintenances.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const pending = maintenances.filter((m) => !m.completed);
  const completed = maintenances.filter((m) => m.completed);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">정기점검 일정</h2>
          <p className="text-gray-600 mt-1">점검 일정을 관리하세요</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {showForm ? '✕ 닫기' : '+ 일정 추가'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-6 bg-blue-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">점검 종류</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="정기점검">정기점검</option>
                  <option value="타이어 교체">타이어 교체</option>
                  <option value="오일 교환">오일 교환
                  </option>
                  <option value="배터리 교체">배터리 교체</option>
                  <option value="브레이크 점검">브레이크 점검</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">예정 날짜</label>
                <Input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">점검 내용</label>
                <Input
                  type="text"
                  name="content"
                  placeholder="예: 정기 점검"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              저장
            </Button>
          </form>
        </Card>
      )}

      {pending.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">예정된 일정</h3>
          <div className="space-y-3">
            {pending.map((m) => (
              <Card key={m.id} className="p-5 hover:shadow-md transition-all border-l-4 border-orange-400">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={m.completed}
                    onChange={() => toggleComplete(m.id)}
                    className="mt-1 w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{m.type}</p>
                    <p className="text-sm text-gray-600 mt-1">📅 {m.scheduledDate}</p>
                    {m.content && <p className="text-sm text-gray-500 mt-1">{m.content}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">완료된 일정</h3>
          <div className="space-y-3">
            {completed.map((m) => (
              <Card key={m.id} className="p-5 hover:shadow-md transition-all border-l-4 border-green-400 opacity-75">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={m.completed}
                    onChange={() => toggleComplete(m.id)}
                    className="mt-1 w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 line-through">{m.type}</p>
                    <p className="text-sm text-gray-600 mt-1">✅ {m.scheduledDate}</p>
                    {m.content && <p className="text-sm text-gray-500 mt-1">{m.content}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {maintenances.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">등록된 일정이 없습니다.</p>
        </Card>
      )}
    </div>
  );
}
