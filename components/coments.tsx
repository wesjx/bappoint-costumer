"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Excellent service! My car looks spotless. Highly recommend!",
    service: "Premium Wash",
  },
  {
    name: "Maria Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Exceptional punctuality and quality. I've been a client for 2 years.",
    service: "Complete Detailing",
  },
  {
    name: "Pedro Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Fair price and perfect result. Online booking is super convenient!",
    service: "Full Wash",
  },
]

export default function Coments() {
  return (
    <div>
      <main className="flex-1">
        <section id="reviews" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 mb-4">What Our Clients Say</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Over 1,000 satisfied clients trust our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviews.map((review, index) => (
                <Card key={index} className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-slate-900">{review.name}</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-3">"{review.comment}"</p>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {review.service}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="flex items-center justify-center space-x-8 text-slate-600">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.9</div>
                  <div className="text-sm">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-sm">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
