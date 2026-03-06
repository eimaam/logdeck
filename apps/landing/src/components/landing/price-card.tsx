import React, { type FC } from 'react'
import { FadeInStagger, FadeInItem } from '../ui/FadeIn'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Check } from "lucide-react";


interface IPriceCard {
    plan: {
        name: string;
        price: string;
        description: string;
        features: string[];
        buttonText: string;
        variant: 'outline' | 'default';
        popular?: boolean;
    }
}


const PriceCard:FC<IPriceCard> = ({plan}) => {
  return (
                    <FadeInItem key={plan.name}>
                        <Card rounded="none" className={`bg-transparent! relative h-full border-border-default p-8 flex flex-col ${plan.popular ? 'border-brand-primary/50 ring-1 ring-brand-primary/50' : ''}`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0  bg-brand-primary text-text-on-primary text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                    Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="font-display text-text-primary font-bold text-xl mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-text-primary">${plan.price}</span>
                                    <span className="text-text-muted">/mo</span>
                                </div>
                                <p className="text-text-muted text-sm mt-4">{plan.description}</p>
                            </div>

                            <div className="grow space-y-4 mb-10">
                                {plan.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-center gap-3 text-text-secondary text-sm">
                                        <Check size={16} className="text-brand-primary" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button variant={plan.variant} fullWidth>
                                {plan.buttonText}
                            </Button>
                        </Card>
                    </FadeInItem>
  )
}

export default PriceCard