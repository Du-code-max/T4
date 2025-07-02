// Khởi tạo biểu đồ học tập
// (Đã loại bỏ đoạn vẽ progressChart để tránh xung đột với reports.html)
document.addEventListener('DOMContentLoaded', function() {
    // Biểu đồ loginChart (tiến độ học tập theo 4 tuần tháng 7/2025)
    const loginCtx = document.getElementById('loginChart');
    if (loginCtx) {
        const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
        const progress = [25, 50, 75, 100];
        const ctx = loginCtx.getContext('2d');
        
        // Tạo gradient màu cho vùng dưới đường
        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
        gradient.addColorStop(0, 'rgba(40, 199, 111, 0.25)'); // Xanh lá nhạt
        gradient.addColorStop(0.5, 'rgba(255, 193, 7, 0.18)'); // Vàng nhạt
        gradient.addColorStop(1, 'rgba(255, 87, 34, 0.15)'); // Cam nhạt
        
        // Đổi màu điểm theo giá trị
        const pointColors = progress.map(val => {
            if (val >= 80) return '#28c76f'; // Xanh lá
            if (val >= 60) return '#ffc107'; // Vàng
            return '#ff5722'; // Cam
        });
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: 'Tiến độ học tập',
                    data: progress,
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: '#4e73df',
                    borderWidth: 2,
                    pointBackgroundColor: pointColors,
                    pointBorderColor: '#fff',
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    tension: 0.4
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                layout: { padding: { right: 40, left: 10, top: 10, bottom: 10 } },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#fff', font: {weight: 'bold'} }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: {
                            color: '#fff',
                            callback: function(value) { return value + '%'; }
                        }
                    }
                },
                responsive: false,
            }
        });
    }

    // Xử lý nộp bài tập
    const submitButtons = document.querySelectorAll('.btn-submit');
    if (submitButtons.length > 0) {
        submitButtons.forEach(button => {
            button.addEventListener('click', function() {
                const assignment = this.closest('li')?.querySelector('h4')?.textContent || 'Bài tập';
                alert(`Bạn đang nộp bài tập: ${assignment}`);
            });
        });
    }

    // Xử lý bắt đầu bài kiểm tra
    const startButtons = document.querySelectorAll('.btn-start');
    if (startButtons.length > 0) {
        startButtons.forEach(button => {
            button.addEventListener('click', function() {
                const quiz = this.closest('li')?.querySelector('h4')?.textContent || 'Bài kiểm tra';
                alert(`Bắt đầu bài kiểm tra: ${quiz}`);
            });
        });
    }

    // Hiệu ứng thông báo - Tương thích mọi trang
    let notificationBtn = document.querySelector('.notification-wrapper .notification-btn') || document.querySelector('.notification-btn');
    let notificationBadge = notificationBtn ? notificationBtn.querySelector('.badge') : null;
    let notificationDropdown = document.querySelector('.notification-wrapper .notification-dropdown') || document.querySelector('.notification-dropdown');
    let notificationItems = notificationDropdown ? notificationDropdown.querySelectorAll('li') : [];
    if (notificationBadge && notificationItems.length > 0) {
        let unreadCount = notificationItems.length;
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
        notificationItems.forEach(item => {
            let marked = false;
            item.addEventListener('mouseenter', function() {
                if (!marked && unreadCount > 0) {
                    unreadCount--;
                    notificationBadge.textContent = unreadCount;
                    marked = true;
                    if (unreadCount === 0) {
                        notificationBadge.style.display = 'none';
                    }
                }
            });
        });
    }

    // Vẽ biểu đồ mini tiến độ học tập (4 tuần)
    var ctxMini = document.getElementById('miniProgressChart');
    if (ctxMini) {
        ctxMini.width = 520;
        ctxMini.height = 300;
        new Chart(ctxMini, {
            type: 'line',
            data: {
                labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
                datasets: [{
                    label: 'Tiến độ',
                    data: [25, 50, 70, 90],
                    borderColor: '#fff',
                    borderWidth: 4,
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#4e73df',
                    pointRadius: 8,
                    pointHoverRadius: 10,
                    fill: true,
                    tension: 0.3,
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '%';
                            }
                        }
                    },
                    title: {
                        display: false
                    }
                },
                layout: {
                    padding: {
                        left: 40,
                        right: 30,
                        top: 30,
                        bottom: 40
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: 'rgba(255,255,255,0.4)',
                            drawBorder: false,
                            lineWidth: 1.5
                        },
                        ticks: {
                            font: { size: 20, family: 'Segoe UI, Arial, sans-serif', weight: 'bold' },
                            color: '#fff',
                            padding: 8
                        }
                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        grid: {
                            display: true,
                            color: 'rgba(255,255,255,0.4)',
                            drawBorder: false,
                            lineWidth: 1.5
                        },
                        ticks: {
                            stepSize: 20,
                            maxTicksLimit: 6,
                            min: 0,
                            max: 100,
                            callback: function(value) { return value + '%'; },
                            font: { size: 20, family: 'Segoe UI, Arial, sans-serif', weight: 'bold' },
                            color: '#fff',
                            padding: 8
                        }
                    }
                }
            }
        });
    }

    // Sinh chuỗi streak (chuỗi 7 ngày học và icon sách đang cháy)
    const streakRow = document.getElementById('streak-row');
    if (streakRow) {
        const days = 7;
        const streakText = document.createElement('span');
        streakText.className = 'streak-days';
        streakText.textContent = 'Chuỗi 7 ngày học:';
        const icons = document.createElement('span');
        icons.className = 'streak-icons';
        for (let i = 0; i < days; i++) {
            const bookFire = document.createElement('span');
            bookFire.className = 'book-fire';
            bookFire.innerHTML = '<i class="fas fa-book"></i><i class="fas fa-fire"></i>';
            icons.appendChild(bookFire);
        }
        streakRow.className = 'streak-row';
        streakRow.appendChild(streakText);
        streakRow.appendChild(icons);
    }
});

// ===== ASSIGNMENT PAGE FUNCTIONS =====
// Dữ liệu bài tập mẫu
const assignments = {
    CS101: {
        todo: [
            {title: 'Bài tập 3 - CS101: Cấu trúc điều khiển', course: 'Nhập môn Lập trình', due: '05/07/2025', btn: 'Xem', icon: 'calendar-alt', btnClass: 'btn-submit'},
        ],
        done: [
            {title: 'Bài tập 2 - CS101: Biến và kiểu dữ liệu', course: 'Nhập môn Lập trình', done: '25/06/2025', btn: 'Chi tiết', icon: 'check', btnClass: 'btn-view'},
        ]
    },
    MATH202: {
        todo: [
            {title: 'Bài tập về nhà 2 - MATH202: Tích phân bội', course: 'Giải tích 2', due: '08/07/2025', btn: 'Xem', icon: 'calendar-alt', btnClass: 'btn-start'},
        ],
        done: [
            {title: 'Bài tập 1 - MATH202: Ôn tập đạo hàm', course: 'Giải tích 2', done: '20/06/2025', btn: 'Chi tiết', icon: 'check', btnClass: 'btn-view'},
        ]
    },
    CS201: {
        todo: [
            {title: 'Bài tập 1 - CS201: Thiết kế CSDL', course: 'Cơ sở dữ liệu', due: '12/07/2025', btn: 'Xem', icon: 'calendar-alt', btnClass: 'btn-submit'},
        ],
        done: [
            {title: 'Bài tập 0 - CS201: Giới thiệu SQL', course: 'Cơ sở dữ liệu', done: '01/07/2025', btn: 'Chi tiết', icon: 'check', btnClass: 'btn-view'},
        ]
    }
};

// Render bài tập
function renderAssignments(subject) {
    // Mặc định hiện tab todo
    document.getElementById('tab-todo').classList.add('active');
    document.getElementById('tab-done').classList.remove('active');
    document.getElementById('tab-content-todo').style.display = '';
    document.getElementById('tab-content-done').style.display = 'none';
    // Render todo
    let todoHtml = '<section class="card" style="padding: 32px 32px 24px 32px;"><div class="card-header" style="font-size:1.2rem;"><h3><i class="fas fa-hourglass-half"></i> Bài tập được giao</h3></div><ul class="assignment-list" style="font-size:1.1rem;">';
    if(assignments[subject].todo.length === 0) todoHtml += '<li><div style="padding: 24px; color: #888; font-size:1.1rem;">Không có bài tập nào.</div></li>';
    assignments[subject].todo.forEach(a => {
        todoHtml += `<li><div class="assignment-info"><h4 style='font-size:1.1rem;'>${a.title}</h4><p style='font-size:1.05rem;'>Khóa học: ${a.course}</p></div><div class="assignment-due"><i class="fas fa-${a.icon}"></i><span style='font-size:1.05rem;'>Hạn nộp: ${a.due||''}</span><button class="${a.btnClass}" style='font-size:1.05rem; padding:8px 18px;'>${a.btn}</button></div></li>`;
    });
    todoHtml += '</ul></section>';
    document.getElementById('tab-content-todo').innerHTML = todoHtml;
    // Render done
    let doneHtml = '<section class="card" style="padding: 32px 32px 24px 32px;"><div class="card-header" style="font-size:1.2rem;"><h3><i class="fas fa-check-circle"></i> Bài tập đã hoàn thành</h3></div><ul class="assignment-list" style="font-size:1.1rem;">';
    if(assignments[subject].done.length === 0) doneHtml += '<li><div style="padding: 24px; color: #888; font-size:1.1rem;">Chưa có bài tập nào hoàn thành.</div></li>';
    assignments[subject].done.forEach(a => {
        doneHtml += `<li><div class="assignment-info"><h4 style='font-size:1.1rem;'>${a.title}</h4><p style='font-size:1.05rem;'>Khóa học: ${a.course}</p></div><div class="assignment-due"><i class="fas fa-${a.icon}"></i><span style='font-size:1.05rem;'>Đã nộp: ${a.done||''}</span><button class="${a.btnClass}" style='font-size:1.05rem; padding:8px 18px;'>${a.btn}</button></div></li>`;
    });
    doneHtml += '</ul></section>';
    document.getElementById('tab-content-done').innerHTML = doneHtml;
}

// ===== QUIZZES PAGE FUNCTIONS =====
// Dữ liệu bài kiểm tra mẫu
const quizzes = {
    CS101: {
        upcoming: [
            {title: 'Bài kiểm tra giữa kỳ - CS101', course: 'Nhập môn Lập trình', date: '10/07/2025', btn: 'Làm bài', icon: 'calendar-alt', btnClass: 'btn-start'},
        ],
        done: [
            {title: 'Bài kiểm tra 15 phút - CS101: Vòng lặp', course: 'Nhập môn Lập trình', score: '9/10', btn: 'Xem lại', icon: 'check', btnClass: 'btn-view'},
        ]
    },
    MATH202: {
        upcoming: [
            {title: 'Kiểm tra vấn đáp - MATH202', course: 'Giải tích 2', date: '12/07/2025', btn: 'Xem chi tiết', icon: 'calendar-alt', btnClass: 'btn-view'},
        ],
        done: [
            {title: 'Bài kiểm tra thường xuyên - MATH202: Chuỗi', course: 'Giải tích 2', score: '8.5/10', btn: 'Xem lại', icon: 'check', btnClass: 'btn-view'},
        ]
    },
    CS201: {
        upcoming: [
            {title: 'Quiz 1 - CS201: ERD', course: 'Cơ sở dữ liệu', date: '15/07/2025', btn: 'Làm bài', icon: 'calendar-alt', btnClass: 'btn-start'},
        ],
        done: [
            {title: 'Quiz 0 - CS201: SQL cơ bản', course: 'Cơ sở dữ liệu', score: '10/10', btn: 'Xem lại', icon: 'check', btnClass: 'btn-view'},
        ]
    }
};

// Render bài kiểm tra
function renderQuizzes(subject) {
    // Mặc định hiện tab upcoming
    document.getElementById('tab-upcoming').classList.add('active');
    document.getElementById('tab-done').classList.remove('active');
    document.getElementById('tab-content-upcoming').style.display = '';
    document.getElementById('tab-content-done').style.display = 'none';
    // Render upcoming
    let upHtml = '<section class="card" style="padding: 32px 32px 24px 32px;"><div class="card-header" style="font-size:1.2rem;"><h3><i class="fas fa-clock"></i> Bài kiểm tra sắp tới</h3></div><ul class="assignment-list" style="font-size:1.1rem;">';
    if(quizzes[subject].upcoming.length === 0) upHtml += '<li><div style="padding: 24px; color: #888; font-size:1.1rem;">Không có bài kiểm tra nào.</div></li>';
    quizzes[subject].upcoming.forEach(a => {
        upHtml += `<li><div class="assignment-info"><h4 style='font-size:1.1rem;'>${a.title}</h4><p style='font-size:1.05rem;'>Khóa học: ${a.course}</p></div><div class="assignment-due"><i class="fas fa-${a.icon}"></i><span style='font-size:1.05rem;'>Ngày: ${a.date||''}</span><button class="${a.btnClass}" style='font-size:1.05rem; padding:8px 18px;'>${a.btn}</button></div></li>`;
    });
    upHtml += '</ul></section>';
    document.getElementById('tab-content-upcoming').innerHTML = upHtml;
    // Render done
    let doneHtml = '<section class="card" style="padding: 32px 32px 24px 32px;"><div class="card-header" style="font-size:1.2rem;"><h3><i class="fas fa-check-double"></i> Bài kiểm tra đã hoàn thành</h3></div><ul class="assignment-list" style="font-size:1.1rem;">';
    if(quizzes[subject].done.length === 0) doneHtml += '<li><div style="padding: 24px; color: #888; font-size:1.1rem;">Chưa có bài kiểm tra nào hoàn thành.</div></li>';
    quizzes[subject].done.forEach(a => {
        doneHtml += `<li><div class="assignment-info"><h4 style='font-size:1.1rem;'>${a.title}</h4><p style='font-size:1.05rem;'>Khóa học: ${a.course}</p></div><div class="assignment-due"><i class="fas fa-${a.icon}"></i><span style='font-size:1.05rem;'>Điểm: ${a.score||''}</span><button class="${a.btnClass}" style='font-size:1.05rem; padding:8px 18px;'>${a.btn}</button></div></li>`;
    });
    doneHtml += '</ul></section>';
    document.getElementById('tab-content-done').innerHTML = doneHtml;
}

// ===== REPORTS PAGE FUNCTIONS =====
// Dữ liệu báo cáo chi tiết từng môn
const courseReports = {
    CS101: {
        assignments: {
            total: 10,
            completed: 8,
            average: 8.5,
            recent: [
                {title: 'Bài tập 3 - Vòng lặp', score: '9/10', status: 'Hoàn thành', date: '25/06/2025'},
                {title: 'Bài tập 2 - Biến và kiểu dữ liệu', score: '8/10', status: 'Hoàn thành', date: '20/06/2025'},
                {title: 'Bài tập 1 - Giới thiệu', score: '8.5/10', status: 'Hoàn thành', date: '15/06/2025'}
            ],
            upcoming: [
                {title: 'Bài tập 4 - Mảng', due: '05/07/2025', status: 'Chưa nộp'}
            ]
        },
        quizzes: {
            total: 5,
            completed: 3,
            average: 8.7,
            recent: [
                {title: 'Bài kiểm tra 15 phút - Vòng lặp', score: '9/10', date: '22/06/2025'},
                {title: 'Quiz 1 - Biến và kiểu dữ liệu', score: '8.5/10', date: '18/06/2025'},
                {title: 'Bài kiểm tra đầu kỳ', score: '8/10', date: '10/06/2025'}
            ],
            upcoming: [
                {title: 'Bài kiểm tra giữa kỳ', date: '10/07/2025', status: 'Chưa làm'}
            ]
        }
    },
    MATH202: {
        assignments: {
            total: 8,
            completed: 6,
            average: 7.8,
            recent: [
                {title: 'Bài tập 2 - Tích phân bội', score: '7.5/10', status: 'Hoàn thành', date: '23/06/2025'},
                {title: 'Bài tập 1 - Ôn tập đạo hàm', score: '8/10', status: 'Hoàn thành', date: '18/06/2025'}
            ],
            upcoming: [
                {title: 'Bài tập 3 - Chuỗi số', due: '08/07/2025', status: 'Chưa nộp'}
            ]
        },
        quizzes: {
            total: 4,
            completed: 2,
            average: 7.5,
            recent: [
                {title: 'Bài kiểm tra thường xuyên - Chuỗi', score: '8.5/10', date: '20/06/2025'},
                {title: 'Quiz 1 - Tích phân', score: '6.5/10', date: '15/06/2025'}
            ],
            upcoming: [
                {title: 'Kiểm tra vấn đáp', date: '12/07/2025', status: 'Chưa làm'}
            ]
        }
    },
    CS201: {
        assignments: {
            total: 5,
            completed: 5,
            average: 9.2,
            recent: [
                {title: 'Bài tập 1 - Thiết kế CSDL', score: '9.5/10', status: 'Hoàn thành', date: '28/06/2025'},
                {title: 'Bài tập 0 - Giới thiệu SQL', score: '9/10', status: 'Hoàn thành', date: '25/06/2025'}
            ],
            upcoming: []
        },
        quizzes: {
            total: 3,
            completed: 3,
            average: 9.7,
            recent: [
                {title: 'Quiz 1 - ERD', score: '10/10', date: '25/06/2025'},
                {title: 'Quiz 0 - SQL cơ bản', score: '10/10', date: '20/06/2025'}
            ],
            upcoming: []
        }
    }
};

// Render báo cáo khóa học
function renderCourseReport(subject) {
    // Mặc định hiện tab assignments
    document.getElementById('tab-assignments').classList.add('active');
    document.getElementById('tab-assignments').style.background = '#e3f0ff';
    document.getElementById('tab-assignments').style.color = '#2a4cb3';
    document.getElementById('tab-quizzes').classList.remove('active');
    document.getElementById('tab-quizzes').style.background = '#f8f9fc';
    document.getElementById('tab-quizzes').style.color = '#888';
    document.getElementById('tab-content-assignments').style.display = '';
    document.getElementById('tab-content-quizzes').style.display = 'none';
    
    const data = courseReports[subject];
    
    // Render báo cáo bài tập
    let assignHtml = '<div style="padding: 32px 32px 24px 32px;">';
    
    // Bảng chi tiết bài tập
    assignHtml += '<div style="background: white; border-radius: 12px; border: 1px solid #e3e6f0; overflow: hidden; margin-bottom: 24px;">';
    assignHtml += '<div style="overflow-x: auto;">';
    assignHtml += '<table style="width: 100%; border-collapse: collapse;">';
    assignHtml += '<thead>';
    assignHtml += '<tr style="background: #f8f9fc;">';
    assignHtml += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Tình trạng</th>';
    assignHtml += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Tên bài tập</th>';
    assignHtml += '<th style="padding: 16px; text-align: center; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Điểm</th>';
    assignHtml += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Nhận xét</th>';
    assignHtml += '</tr>';
    assignHtml += '</thead>';
    assignHtml += '<tbody>';
    
    // Thêm dữ liệu bài tập đã hoàn thành
    data.assignments.recent.forEach(item => {
        assignHtml += '<tr style="border-bottom: 1px solid #f0f2f5;">';
        assignHtml += '<td style="padding: 16px;"><span style="background: #d4edda; color: #155724; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;"><i class="fas fa-check-circle"></i> Hoàn thành</span></td>';
        assignHtml += `<td style="padding: 16px; font-weight: 600; color: #2a4cb3;">${item.title}</td>`;
        assignHtml += `<td style="padding: 16px; text-align: center;"><span style="background: #28a745; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.9rem;">${item.score}</span></td>`;
        assignHtml += `<td style="padding: 16px; color: #6c757d;">${getAssignmentComment(item.score)}</td>`;
        assignHtml += '</tr>';
    });
    
    // Thêm dữ liệu bài tập sắp tới
    data.assignments.upcoming.forEach(item => {
        assignHtml += '<tr style="border-bottom: 1px solid #f0f2f5;">';
        assignHtml += '<td style="padding: 16px;"><span style="background: #fff3cd; color: #856404; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;"><i class="fas fa-clock"></i> Chưa nộp</span></td>';
        assignHtml += `<td style="padding: 16px; font-weight: 600; color: #2a4cb3;">${item.title}</td>`;
        assignHtml += '<td style="padding: 16px; text-align: center;"><span style="background: #6c757d; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.9rem;">-</span></td>';
        assignHtml += '<td style="padding: 16px; color: #6c757d;">Chưa có nhận xét</td>';
        assignHtml += '</tr>';
    });
    
    assignHtml += '</tbody>';
    assignHtml += '</table>';
    assignHtml += '</div>';
    assignHtml += '</div>';
    document.getElementById('tab-content-assignments').innerHTML = assignHtml;
    
    // Render báo cáo bài kiểm tra
    let quizHtml = '<div style="padding: 32px 32px 24px 32px;">';
    
    // Bảng chi tiết bài kiểm tra
    quizHtml += '<div style="background: white; border-radius: 12px; border: 1px solid #e3e6f0; overflow: hidden; margin-bottom: 24px;">';
    quizHtml += '<div style="overflow-x: auto;">';
    quizHtml += '<table style="width: 100%; border-collapse: collapse;">';
    quizHtml += '<thead>';
    quizHtml += '<tr style="background: #f8f9fc;">';
    quizHtml += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Tình trạng</th>';
    quizHtml += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Tên bài kiểm tra</th>';
    quizHtml += '<th style="padding: 16px; text-align: center; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Điểm</th>';
    quizHtml += '<th style="padding: 16px; text-align: left; border-bottom: 1px solid #e3e6f0; font-weight: 700; color: #2a4cb3;">Nhận xét</th>';
    quizHtml += '</tr>';
    quizHtml += '</thead>';
    quizHtml += '<tbody>';
    
    // Thêm dữ liệu bài kiểm tra đã hoàn thành
    data.quizzes.recent.forEach(item => {
        quizHtml += '<tr style="border-bottom: 1px solid #f0f2f5;">';
        quizHtml += '<td style="padding: 16px;"><span style="background: #d4edda; color: #155724; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;"><i class="fas fa-check-circle"></i> Hoàn thành</span></td>';
        quizHtml += `<td style="padding: 16px; font-weight: 600; color: #2a4cb3;">${item.title}</td>`;
        quizHtml += `<td style="padding: 16px; text-align: center;"><span style="background: #28a745; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.9rem;">${item.score}</span></td>`;
        quizHtml += `<td style="padding: 16px; color: #6c757d;">${getQuizComment(item.score)}</td>`;
        quizHtml += '</tr>';
    });
    
    // Thêm dữ liệu bài kiểm tra sắp tới
    data.quizzes.upcoming.forEach(item => {
        quizHtml += '<tr style="border-bottom: 1px solid #f0f2f5;">';
        quizHtml += '<td style="padding: 16px;"><span style="background: #fff3cd; color: #856404; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;"><i class="fas fa-clock"></i> Chưa làm</span></td>';
        quizHtml += `<td style="padding: 16px; font-weight: 600; color: #2a4cb3;">${item.title}</td>`;
        quizHtml += '<td style="padding: 16px; text-align: center;"><span style="background: #6c757d; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.9rem;">-</span></td>';
        quizHtml += '<td style="padding: 16px; color: #6c757d;">Chưa có nhận xét</td>';
        quizHtml += '</tr>';
    });
    
    quizHtml += '</tbody>';
    quizHtml += '</table>';
    quizHtml += '</div>';
    quizHtml += '</div>';
    
    document.getElementById('tab-content-quizzes').innerHTML = quizHtml;
}

// Hàm tạo nhận xét dựa trên điểm số bài kiểm tra
function getQuizComment(score) {
    const scoreNum = parseFloat(score.split('/')[0]);
    if (scoreNum >= 9) {
        return 'Xuất sắc! Hiểu rõ kiến thức và vận dụng tốt.';
    } else if (scoreNum >= 8) {
        return 'Tốt! Nắm vững kiến thức cơ bản.';
    } else if (scoreNum >= 7) {
        return 'Khá! Cần ôn tập thêm một số phần.';
    } else if (scoreNum >= 6) {
        return 'Trung bình! Cần học lại kiến thức.';
    } else {
        return 'Cần cải thiện! Hãy ôn tập kỹ hơn.';
    }
}

// Hàm tạo nhận xét dựa trên điểm số bài tập
function getAssignmentComment(score) {
    const scoreNum = parseFloat(score.split('/')[0]);
    if (scoreNum >= 9) {
        return 'Hoàn thành xuất sắc! Code sạch và logic rõ ràng.';
    } else if (scoreNum >= 8) {
        return 'Hoàn thành tốt! Có thể cải thiện thêm về tối ưu hóa.';
    } else if (scoreNum >= 7) {
        return 'Hoàn thành khá! Cần chú ý thêm về cú pháp và logic.';
    } else if (scoreNum >= 6) {
        return 'Hoàn thành cơ bản! Cần ôn tập lại kiến thức.';
    } else {
        return 'Cần làm lại! Hãy xem lại bài giảng và thực hành thêm.';
    }
}

// ===== PAGE SPECIFIC INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo biểu đồ tiến độ học tập cho reports page
    const progressCtx = document.getElementById('progressChart');
    const timeCtx = document.getElementById('timeChart');
    let currentChart;
    if (progressCtx) {
        const ctx = progressCtx.getContext('2d');
        // Dữ liệu tuần: 7 ngày
        const weekLabels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
        const weekData = [75, 82, 78, 85, 90, 88, 92];
        // Hàm tạo chart
        function createProgressChart(labels, data) {
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Tiến độ học tập',
                        data: data,
                        borderColor: '#4e73df',
                        backgroundColor: 'rgba(78, 115, 223, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointBackgroundColor: '#4e73df',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#4e73df',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return 'Tiến độ: ' + context.parsed.y + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: '#6c757d', font: { size: 12 } }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: '#f0f2f5', borderDash: [5, 5] },
                            ticks: { color: '#6c757d', callback: v => v + '%', font: { size: 12 } }
                        }
                    }
                }
            });
        }
        // Mặc định: biểu đồ tuần
        currentChart = createProgressChart(weekLabels, weekData);
    }
    // Biểu đồ phân bố thời gian học
    if (timeCtx) {
        const timeChartCtx = timeCtx.getContext('2d');
        new Chart(timeChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['CS101 - Lập trình', 'MATH202 - Giải tích', 'CS201 - Cơ sở dữ liệu'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: [
                        '#4e73df',
                        '#f6c23e',
                        '#1cc88a'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#4e73df',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Xử lý chọn môn học ở sidebar cho assignment page
    document.querySelectorAll('.sidebar-subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sidebar-subject-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const subject = this.getAttribute('data-subject');
            
            // Kiểm tra trang hiện tại để gọi function phù hợp
            if (window.location.pathname.includes('assignment.html')) {
                renderAssignments(subject);
            } else if (window.location.pathname.includes('quizzes.html')) {
                renderQuizzes(subject);
            } else if (window.location.pathname.includes('reports.html')) {
                renderCourseReport(subject);
            }
        });
    });

    // Xử lý tab cho assignment page
    const tabTodo = document.getElementById('tab-todo');
    const tabDone = document.getElementById('tab-done');
    if (tabTodo && tabDone) {
        tabTodo.onclick = function() {
            this.classList.add('active');
            document.getElementById('tab-done').classList.remove('active');
            document.getElementById('tab-content-todo').style.display = '';
            document.getElementById('tab-content-done').style.display = 'none';
        };
        tabDone.onclick = function() {
            this.classList.add('active');
            document.getElementById('tab-todo').classList.remove('active');
            document.getElementById('tab-content-todo').style.display = 'none';
            document.getElementById('tab-content-done').style.display = '';
        };
    }

    // Xử lý tab cho quizzes page
    const tabUpcoming = document.getElementById('tab-upcoming');
    const tabDoneQuiz = document.getElementById('tab-done');
    if (tabUpcoming && tabDoneQuiz && window.location.pathname.includes('quizzes.html')) {
        tabUpcoming.onclick = function() {
            this.classList.add('active');
            document.getElementById('tab-done').classList.remove('active');
            document.getElementById('tab-content-upcoming').style.display = '';
            document.getElementById('tab-content-done').style.display = 'none';
        };
        tabDoneQuiz.onclick = function() {
            this.classList.add('active');
            document.getElementById('tab-upcoming').classList.remove('active');
            document.getElementById('tab-content-upcoming').style.display = 'none';
            document.getElementById('tab-content-done').style.display = '';
        };
    }

    // Xử lý tab cho reports page
    const tabAssignments = document.getElementById('tab-assignments');
    const tabQuizzes = document.getElementById('tab-quizzes');
    if (tabAssignments && tabQuizzes) {
        tabAssignments.onclick = function() {
            this.classList.add('active');
            this.style.background = '#e3f0ff';
            this.style.color = '#2a4cb3';
            document.getElementById('tab-quizzes').classList.remove('active');
            document.getElementById('tab-quizzes').style.background = '#f8f9fc';
            document.getElementById('tab-quizzes').style.color = '#888';
            document.getElementById('tab-content-assignments').style.display = '';
            document.getElementById('tab-content-quizzes').style.display = 'none';
        };
        tabQuizzes.onclick = function() {
            this.classList.add('active');
            this.style.background = '#e3f0ff';
            this.style.color = '#2a4cb3';
            document.getElementById('tab-assignments').classList.remove('active');
            document.getElementById('tab-assignments').style.background = '#f8f9fc';
            document.getElementById('tab-assignments').style.color = '#888';
            document.getElementById('tab-content-assignments').style.display = 'none';
            document.getElementById('tab-content-quizzes').style.display = '';
        };
    }

    // Khởi tạo dữ liệu mặc định cho từng trang
    if (window.location.pathname.includes('assignment.html')) {
        renderAssignments('CS101');
    } else if (window.location.pathname.includes('quizzes.html')) {
        renderQuizzes('CS101');
    } else if (window.location.pathname.includes('reports.html')) {
        renderCourseReport('CS101');
    }
});