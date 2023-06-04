import { initializeApp } from "firebase/app"; // استيراد وظيفة initializeApp من مكتبة Firebase لتهيئة التطبيق
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // استيراد وظائف المصادقة من مكتبة Firebase لإنشاء وتسجيل الدخول وتسجيل الخروج
import { collection, getFirestore, addDoc, getDocs } from 'firebase/firestore'; // استيراد وظائف قاعدة بيانات Firestore من مكتبة Firebase للتعامل مع المستندات والمجموعات
import Router from "next/router"; // استيراد وظيفة Router من Next.js لتنقل بين الصفحات

const firebaseConfig = {
  // تكوين Firebase: يحتوي على تفاصيل تكوين التطبيق مثل معرف التطبيق، معرف المشروع، المفتاح السري، ومعلومات الدخول
  apiKey: "AIzaSyB_glb7xN5BtWFyGkMsByTAVvxX3rnNmNM",
  authDomain: "sisystem-c9579.firebaseapp.com",
  projectId: "sisystem-c9579",
  storageBucket: "sisystem-c9579.appspot.com",
  messagingSenderId: "453462963187",
  appId: "1:453462963187:web:83c0de7d64af3323d2d886",
  measurementId: "G-YPE0CL1H8V"
};

function initializeFirebase() {
  const app = initializeApp(firebaseConfig); // تهيئة التطبيق باستخدام تفاصيل التكوين وإرجاعه
  return app; // إرجاع التطبيق المهيأ
}

async function createEmailAndPassword(email, password) {
  try {
    const app = initializeFirebase(); // تهيئة التطبيق
    const authInstance = getAuth(app); // الحصول على مثيل وحدة المصادقة باستخدام التطبيق المهيأ
    await createUserWithEmailAndPassword(authInstance, email, password); // إنشاء حساب باستخدام عنوان البريد الإلكتروني وكلمة المرور
    alert("Email and password created successfully"); // عرض رسالة تأكيد إنشاء الحساب بنجاح
  } catch (error) {
    alert(error); // عرض رسالة الخطأ إذا حدث خطأ في إنشاء الحساب
  }
}

async function loginEmailAndPassword(email, password) {
  try {
    const app = initializeFirebase(); // تهيئة التطبيق
    const authInstance = getAuth(app); // الحصول على مثيل وحدة المصادقة باستخدام التطبيق المهيأ
    await signInWithEmailAndPassword(authInstance, email, password); // تسجيل الدخول باستخدام عنوان البريد الإلكتروني وكلمة المرور
    alert("Email and password login successfully"); // عرض رسالة تأكيد تسجيل الدخول بنجاح
  } catch (error) {
    alert(error); // عرض رسالة الخطأ إذا حدث خطأ في تسجيل الدخول
  }
}

async function addUserToFirestore(username, email, password) {
  try {
    const app = initializeFirebase(); // تهيئة التطبيق
    const firestoreInstance = getFirestore(app); // الحصول على مثيل وحدة Firestore باستخدام التطبيق المهيأ
    const firestoreCollection = collection(firestoreInstance, "users"); // الوصول إلى مجموعة المستندات "users" في قاعدة البيانات
    await addDoc(firestoreCollection, { // إضافة مستند جديد إلى مجموعة المستندات
      username: username,
      email: email,
      password: password,
    });

    console.log("User added to Firestore successfully"); // عرض رسالة تأكيد إضافة المستخدم إلى قاعدة البيانات بنجاح
  } catch (error) {
    console.log(error); // عرض رسالة الخطأ إذا حدث خطأ في إضافة المستخدم إلى قاعدة البيانات
  }
}

async function getUsersFromFirestore(email, uid) {
  var users = []; // قائمة لتخزين المستخدمين

  try {
    const app = initializeFirebase(); // تهيئة التطبيق
    const firestoreInstance = getFirestore(app); // الحصول على مثيل وحدة Firestore باستخدام التطبيق المهيأ
    const firestoreCollection = collection(firestoreInstance, "users"); // الوصول إلى مجموعة المستندات "users" في قاعدة البيانات
    const querySnapshot = await getDocs(firestoreCollection); // الحصول على مستندات المجموعة

    querySnapshot.forEach((doc) => { // تحقق من كل مستند في النتيجة
      if (email === doc.data().email) {
        Router.push(`/home/${doc.id}`); // إعادة التوجيه إلى صفحة المستخدم المطلوبة إذا تطابق عنوان البريد الإلكتروني
      }

      if (uid === doc.id) {
        users.push(doc.data()); // إضافة بيانات المستخدم إلى قائمة المستخدمين إذا تطابق معرف المستخدم
      }
    });
  } catch (error) {
    console.log(error); // عرض رسالة الخطأ إذا حدث خطأ في الوصول إلى قاعدة البيانات
  }

  return users; // إرجاع قائمة المستخدمين
}

async function logout() {
  try {
    const app = initializeFirebase(); // تهيئة التطبيق
    const authInstance = getAuth(app); // الحصول على مثيل وحدة المصادقة باستخدام التطبيق المهيأ
    await signOut(authInstance); // تسجيل الخروج
    alert("Logout successful"); // عرض رسالة تأكيد تسجيل الخروج بنجاح
    Router.push("/loginpage"); // إعادة التوجيه إلى صفحة تسجيل الدخول
  } catch (error) {
    console.log(error); // عرض رسالة الخطأ إذا حدث خطأ في تسجيل الخروج
  }
}

export {
  createEmailAndPassword,
  addUserToFirestore,
  loginEmailAndPassword,
  getUsersFromFirestore,
  logout
};
