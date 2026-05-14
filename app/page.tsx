'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { ChevronRight } from '@/components/ui/icons';

interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  type: string;
  purchaseDate: string;
  mileage: number;
}

const DEMO_VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'BMW X5',
    licensePlate: '45가 1234',
    type: 'SUV',
    purchaseDate: '2021-05-15',
    mileage: 35000,
  },
  {
    id: '2',
    name: '현대 싼타페',
    licensePlate: '12다 5678',
    type: 'SUV',
    purchaseDate: '2022-03-20',
    mileage: 18500,
  },
];

export default function Dashboard() {
  const [vehicles] = useState<Vehicle[]>(DEMO_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">대시보드</h2>
            <p className="text-gray-600 mt-1">등록된 차량을 관리하세요</p>
          </div>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ 차량 등록</Button>
          </Link>
        </div>
      </section>

      {/* 차량 목록 */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">등록된 차량</h3>
        {vehicles.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">등록된 차량이 없습니다.</p>
            <Link href="/register" className="mt-4 inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">첫 차량 등록하기</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedVehicleId === vehicle.id
                    ? 'ring-2 ring-blue-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedVehicleId(vehicle.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{vehicle.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{vehicle.licensePlate}</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-600">차종:</span>
                        <span className="font-semibold ml-2 text-gray-900">{vehicle.type}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600">주행거리:</span>
                        <span className="font-semibold ml-2 text-gray-900">{vehicle.mileage.toLocaleString()}km</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600">구매일:</span>
                        <span className="font-semibold ml-2 text-gray-900">{vehicle.purchaseDate}</span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 mt-1" />
                </div>

                {selectedVehicleId === vehicle.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                    <Link href={`/vehicle/${vehicle.id}`}>
                      <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900">상세 정보 보기</Button>
                    </Link>
                    <Link href={`/cost/${vehicle.id}`}>
                      <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900">비용 기록</Button>
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* 빠른 접근 */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">빠른 접근</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/statistics">
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer h-full">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900">통계 분석</h4>
              <p className="text-sm text-gray-600 mt-1">월별·차량별 비용 현황</p>
            </Card>
          </Link>
          <Link href="/maintenance">
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer h-full">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-semibold text-gray-900">정기점검</h4>
              <p className="text-sm text-gray-600 mt-1">점검 일정 관리</p>
            </Card>
          </Link>
          <Link href="/cost">
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer h-full">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-gray-900">비용 관리</h4>
              <p className="text-sm text-gray-600 mt-1">모든 비용 기록</p>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
