<script>
  export let data; // ใช้ export let data เพื่อรับ prop ที่ส่งมาจาก server

  const post = data.post;
</script>

<style>
 /* คอนเทนเนอร์สำหรับโพสต์ */
.post-container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 2 คอลัมน์: คอลัมน์แรกสำหรับรูปภาพ, คอลัมน์ที่สองสำหรับข้อมูล */
  gap: 20px; /* ช่องว่างระหว่างคอลัมน์ */
  margin-top: 30px;
}

/* รูปภาพของโพสต์ */
.post-image {
  display: flex;
  justify-content: center; /* จัดตำแหน่งแนวนอนให้อยู่กลาง */
  align-items: center; /* จัดตำแหน่งแนวตั้งให้อยู่กลาง */
  flex-direction: column; /* ทำให้เนื้อหาเรียงจากบนลงล่าง */
}

.post-image img {
  width: 100%; /* กำหนดให้ความกว้างของรูปภาพเต็มตามคอนเทนเนอร์ */
  height: auto; /* ปรับความสูงให้สมส่วนกับความกว้าง */
  object-fit: contain; /* ให้รูปภาพอยู่ในกรอบโดยไม่ผิดสัดส่วน */
  object-position: center; /* จัดตำแหน่งรูปภาพให้อยู่ตรงกลางเมื่อมีพื้นที่ว่าง */
  border-radius: 8px; /* มุมรูปภาพโค้งมน */
  margin-bottom: 15px; /* ช่องว่างระหว่างรูปกับข้อมูลโพสต์ */
  max-width: 100%; /* จำกัดความกว้างให้ไม่เกินขอบของ post-info */
  display: block; /* ทำให้รูปเป็น block element */
  margin-left: auto;
  margin-right: auto; /* จัดรูปภาพให้อยู่กลาง */
}

/* ข้อมูลของโพสต์ */
.post-info {
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ชื่อโพสต์ */
.post-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

/* ข้อความของโพสต์ */
.post-info p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
}

.post-info strong {
  color: #0077cc; /* ทำให้ข้อความที่มี <strong> มีสีที่เด่น */
}

/* รายละเอียดโพสต์ */
.post-details {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-top: 20px;
  white-space: normal; /* ให้ตัวหนังสือกลับมาตามปกติ ไม่ยืดไปจนเกินขอบ */
  word-wrap: break-word; /* ตัดคำที่ยาวเกินไปให้อยู่ในบรรทัดใหม่ */
  word-break: break-word; /* ป้องกันคำยาวที่อาจทำให้เกิดปัญหาการแสดงผล */
  max-width: 100%; /* ป้องกันข้อความเกินขอบของคอนเทนเนอร์ */
}


/* ปรับสำหรับมือถือ */
@media (max-width: 768px) {
  .post-container {
    grid-template-columns: 1fr; /* เปลี่ยนเป็นคอลัมน์เดียวในมือถือ */
  }
}


</style>

<div class="post-container">
  <div class="post-image">
    <img src={post.imageUrl} alt="รูปภาพ" />
  </div>
  <div class="post-info">
    <h1 class="post-title">{post.title}</h1>
    <p><strong>เพศ:</strong> {post.gender}</p>
    <p><strong>อายุ:</strong> {post.age}</p>
    <p><strong>ไลน์:</strong> {post.line}</p>
    <p><strong>จังหวัด:</strong> {post.province}</p>
    <div class="post-details">
      <p>{post.details}</p>
    </div>
  </div>
</div>