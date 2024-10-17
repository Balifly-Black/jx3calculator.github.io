// pzPlanService.js

// 定义请求方法
export async function fetchPzPlan(id) {
    const domain = 'cms.jx3box.com';
    const path = `/api/cms/app/pz/${id}`;
  
    const response = await fetch(`https://${domain}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    const 力道 = data["data"]["data"];
    return 力道;
  }