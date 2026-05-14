'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';

interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  type: string;
  purchaseDate: string;
  mileage: number;
}

const DEMO_VEHICLE: Vehicle = {
  id: '1',
  name: 'BMW X5',
  licensePlate: '45가 1234',
  type: 'SUV',
  purchaseDate: '2021-05-15',
  mileage: 35000,
};

export default function VehicleDetail() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle>(DEMO_VEHICLE);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Vehicle>(DEMO_VEHICLE);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'mileage' ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    setVehicle(editData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{vehicle.name}</h2>
        <Button
          onClick={() => router.push('/')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          ← 돌아가기
        </Button>
      </div>

      <Card className="p-8">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">차명</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">번호판</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.licensePlate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">차종</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">구매일</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.purchaseDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">현재 주행거리</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.mileage.toLocaleString()} km</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                수정
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">차명</label>
              <Input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">번호판</label>
              <Input
                type="text"
                name="licensePlate"
                value={editData.licensePlate}
                onChange={handleEditChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">현재 주행거리 (km)</label>
              <Input
                type="number"
                name="mileage"
                value={editData.mileage}
                onChange={handleEditChange}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                저장
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900"
              >
                취소
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
