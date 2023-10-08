export default function WhatsAppButton() {
	return (
		<div className="fixed bottom-4 right-4 z-10">
			<a
				href="https://api.whatsapp.com/send?phone=573234888040"
				target="_blank"
				rel="noopener noreferrer"
				className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
			>
				<img src="/images/wp.svg" className="h-8 mr-2" />
				Contactar por WhatsApp
			</a>
		</div>
	);
}
