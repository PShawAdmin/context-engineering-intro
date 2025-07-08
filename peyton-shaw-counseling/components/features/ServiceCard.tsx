import Link from 'next/link';
import {Card, CardHeader, CardBody, CardFooter} from '@heroui/card';
import {Button} from '@heroui/button';
import { Service } from '@/lib/types';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full bg-nude-cream border border-nude-sand hover:shadow-clay transition-all duration-300 hover:transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <Heading level={3} className="text-text-charcoal">
          {service.title}
        </Heading>
      </CardHeader>
      <CardBody className="py-2">
        <Text className="mb-4">
          {service.description}
        </Text>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Text size="sm" as="span">Duration: {service.duration}</Text>
          </div>
          {service.price && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <Text size="sm" as="span">Fee: {service.price} per session</Text>
            </div>
          )}
        </div>

        {service.benefits && service.benefits.length > 0 && (
          <div className="space-y-1">
            <Text size="sm" weight="medium" color="charcoal" className="mb-2">Key Benefits:</Text>
            <ul className="space-y-1">
              {service.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 mr-2 text-grey-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <Text size="sm" as="span">{benefit}</Text>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          as={Link}
          href={`/services/${service.slug}`}
          variant="flat"
          className="w-full font-medium bg-nude-linen hover:bg-nude-sand text-nude-clay transition-all"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}