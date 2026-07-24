const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setStatus('error');
    setErrorMessage('Proszę podać poprawny adres email');
    return;
  }

  setStatus('loading');

  try {
    const response = await fetch(
      'https://formsubmit.co/ajax/kontakt@frameworkstudio.pl',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          subject: 'Nowy zapis newsletter - La Chatte',
          _template: 'table',
          _captcha: false
        })
      }
    );

    if (!response.ok) {
      throw new Error('Błąd wysyłania formularza');
    }

    setStatus('success');
    setEmail('');

    setTimeout(() => {
      setStatus('idle');
    }, 5000);

  } catch (error) {
    console.error(error);

    setStatus('error');
    setErrorMessage(
      'Nie udało się zapisać. Spróbuj ponownie.'
    );
  }
};
