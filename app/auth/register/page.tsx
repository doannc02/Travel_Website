const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validateStep(currentStep)) {
    try {
      // Đảm bảo lấy đúng dữ liệu từ form
      const submitData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        agreeToTerms: formData.agreeToTerms,
        receiveNewsletter: formData.receiveNewsletter
      };

      console.log('Data being sent:', submitData); // Debug log

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Đăng ký thất bại");
        return;
      }

      alert("Đăng ký thành công!");
      window.location.href = "/auth/login";
    } catch (err) {
      console.error("Register error:", err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  }
};