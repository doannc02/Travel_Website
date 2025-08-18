"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function FeaturedTours() {
	const [items, setItems] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const run = async () => {
			try {
				const res = await fetch('/api/packages?limit=8&page=1')
				const json = await res.json()
				if (json.success) setItems(json.data)
			} finally {
				setLoading(false)
			}
		}
		run()
	}, [])

	if (loading) return null

	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold mb-6">Tour nổi bật</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{items.map((pkg) => (
						<Link key={pkg.id} href={`/tour/${pkg.id}`} className="block bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
							<div className="h-44 overflow-hidden">
								<img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
							</div>
							<div className="p-4">
								<div className="text-sm text-gray-500 mb-1">{pkg.destination?.city}</div>
								<div className="font-semibold">{pkg.title}</div>
								<div className="mt-2 text-red-600 font-bold">{new Intl.NumberFormat('vi-VN').format(pkg.price)}đ</div>
								<div className="text-sm text-gray-500">⭐ {pkg.rating} ({pkg.reviewCount})</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
} 