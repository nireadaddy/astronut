import type { Reading } from '@/types';

export function exportToPDF(reading: Reading) {
  const content = `
โหราศาสตร์ยูเรเนียน - ผลการวิเคราะห์

คะแนนพลังดวง: ${reading.powerScore}/100

การวิเคราะห์โดยรวม:
${reading.overall}

ด้านการงาน (${reading.aspects.career.score}/100):
${reading.aspects.career.text}

ด้านความรัก (${reading.aspects.love.score}/100):
${reading.aspects.love.text}

ด้านการเงิน (${reading.aspects.finance.score}/100):
${reading.aspects.finance.text}

ด้านสุขภาพ (${reading.aspects.health.score}/100):
${reading.aspects.health.text}

การพยากรณ์:
${reading.predictions}

การพยากรณ์ตามช่วงเวลา:

7 วันข้างหน้า:
${reading.dateRanges.week.description}

1 เดือนข้างหน้า:
${reading.dateRanges.month.description}

3 เดือนข้างหน้า:
${reading.dateRanges.threeMonths.description}

6 เดือนข้างหน้า:
${reading.dateRanges.sixMonths.description}
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'reading-result.txt');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function shareResult(reading: Reading) {
  const text = `
ผลการวิเคราะห์ดวงชะตา

คะแนนพลังดวง: ${reading.powerScore}/100
การงาน: ${reading.aspects.career.score}/100
ความรัก: ${reading.aspects.love.score}/100
การเงิน: ${reading.aspects.finance.score}/100
สุขภาพ: ${reading.aspects.health.score}/100
  `;

  if (navigator.share) {
    navigator.share({
      title: 'ผลการวิเคราะห์ดวงชะตา',
      text: text,
    });
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(text);
  }
}
