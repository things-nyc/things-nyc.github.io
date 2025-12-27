import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'what-is-ttn',
    question: 'What is The Things Network and how is it different from LoRaWAN and LoRa?',
    answer: 'The Things Network (TTN) is a free data network for the Internet of Things. LoRa is an innovative way of using unlicensed radio spectrum to transmit small amounts of data, at long range with minimal power. The Things Network uses a standardized protocol called LoRaWAN which uses LoRa technology to connect many devices to the Internet.'
  },
  {
    id: 'node-vs-gateway',
    question: 'What is the difference between a node and a gateway?',
    answer: 'Nodes are usually small, battery-powered sensors that upload their data to the Internet via The Things Network. Gateways are strategically-placed access points that provide coverage for The Things Network.'
  },
  {
    id: 'operators-providers-users',
    question: 'What is the difference between network operators, application providers, and application users?',
    answer: 'Network operators are the many community members (both corporate and individual) who own and operate the infrastructure behind The Things Network. Application providers provide services based on data and analytics from nodes they control. The application users benefit from the data from applications.'
  },
  {
    id: 'sla',
    question: 'Does The Things Network New York provide a Service Level Agreement (SLA)?',
    answer: 'No, but application providers may. Let\'s take an example. Suppose a company called "TrashAware" provides a garbage can monitoring service to U.S. cities. The city of "Smallville" is interested in TrashAware\'s product but requires an SLA stipulating 99.9% uptime. TrashAware assesses the current network coverage in Smallville, and then partners with the city to deploy additional gateways to ensure complete coverage and reliable service. TrashAware then issues an SLA to Smallville covering their entire application, which includes availability of data via their website and a mobile application.'
  },
  {
    id: 'gateway-security',
    question: 'As a gateway operator, does installing the gateway make my own network vulnerable?',
    answer: 'Technically yes, but the security risk is less than a smartphone connecting to your network\'s WiFi. A gateway does technically represent an additional access point into a LAN and should not be placed inside of a trusted zone, however it is an order of magnitude less risk than a smartphone or employee PC. The gateways use industry-standard access control and are secured with administrative credentials setup during installation. While vulnerabilities via the packet forwarding protocol or the LoRa interface are conceivable, they are highly unlikely in practice. A LAN operator can mitigate the risk of compromised gateways on their network by placing them in a separate segment (VLAN), as is routinely done in corporate networks.'
  },
  {
    id: 'data-privacy',
    question: 'As an application provider or user, is my data private?',
    answer: 'Data is encrypted from the node to the application: The Things Network does not have access to the decrypted data. It is the application provider\'s responsibility to ensure that their nodes are designed to adequately protect data prior to transmission. LoRaWAN has AES128 encryption by default, which should be sufficient for most uses, and additional encryption and security measures can be applied for applications which require them. The greatest threat to privacy is not in The Things Network itself, but rather in the third-party applications where the data is stored. TTN has no control over the security of data after it has been sent to and decrypted by applications. A bad actor could theoretically break into the application server and steal/delete/manipulate data or send control commands to IoT devices. Thus, application providers must take security precautions to ensure users can trust them with their data. This is a challenge for IoT in general and not specific to TTN. At the end of the day, if you are using any wireless tech whatsoever, you are transmitting in spectrum that is easily monitored by the public, so you must secure the data at the transmitter and not trust the network like we could(?) with landline telephone. That said, of course we should encourage good security/privacy practices throughout the network.'
  },
  {
    id: 'operator-privacy-responsibility',
    question: 'As an operator of a gateway, am I responsible for user\'s privacy?',
    answer: 'No. The gateways simply listen for radio signals from nodes and pass encrypted data to the network. Gateways do not contain decryption keys or any privileged information.'
  }
];

export default function Faq() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('get-involved');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about The Things Network New York, LoRaWAN technology,
          security, privacy, and how our community network works.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <h3 className="text-lg font-medium text-slate-900 pr-4">
                {item.question}
              </h3>
              <svg
                className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 flex-shrink-0 ${
                  openItems.has(item.id) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4">
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-slate-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-blue-700 mb-4">
            Can't find the answer you're looking for? We're here to help!
          </p>
          <button
            onClick={handleGetInTouch}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}