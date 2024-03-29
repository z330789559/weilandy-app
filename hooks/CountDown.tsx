// 格式化数据，这里就是补零
import {useEffect ,useMemo, useState} from "react";
export interface CountDownOptions {
    /** 截止时间，时间戳 */
    deadlineTime: number;
    /** 是否需要毫秒 */
    showMillisecond?: boolean;
  }
export interface TimeInfo {
    /** 天 */
    day: number;
    /** 小时 */
    hours: number;
    /** 补零后的小时 */
    hoursStr: string;
    /** 分钟 */
    minutes: number;
    /** 补零后的分 */
    minutesStr: string;
    /** 秒 */
    seconds: number;
    /** 补零后的秒 */
    secondsStr: string;
    /** 毫秒 */
    milliseconds?: number;
    /** 补零后的毫秒 */
    millisecondsStr?: string;
    /** 倒计时状态 pending-初始化状态 runing-进行中 end-已结束 */
    status: "pending" | "runing" | "end";
  }
function formate(time: number): string {
    return `${time < 10 ? "0" : ""}${time}`;
  }
  function clearCountdownInfo(showMillisecond = false, status?: TimeInfo["status"]): TimeInfo {
    const timeInfo: TimeInfo = {
      day: 0,
      hours: 0,
      hoursStr: "00",
      minutes: 0,
      minutesStr: "00",
      seconds: 0,
      secondsStr: "00",
      status: status || "end",
    };
  
    if (showMillisecond) {
      timeInfo.milliseconds = 0;
      timeInfo.millisecondsStr = "0";
    }
  
    return timeInfo;
  }
  

  function computeCountdownInfo(
    remainTime: number,
    showMillisecond = false
  ): TimeInfo {
    // 剩余时间小于说明结束，直接清空
    if (remainTime < 0) {
      return clearCountdownInfo(showMillisecond);
    }
  
    // 这里用了一个比较笨的方法，一个个进行计算，后续可以优化试试看
    const day = Math.floor(remainTime / (24 * 60 * 60));
    const hours = Math.floor((remainTime / (60 * 60)) % 24);
    const hoursStr = formate(hours);
    const minutes = Math.floor((remainTime / 60) % 60);
    const minutesStr = formate(minutes);
    const seconds = Math.floor(remainTime % 60);
    const secondsStr = formate(seconds);
  
    // 组合成需要返回的时间信息
    const timeInfo: TimeInfo = {
      day,
      hours,
      hoursStr,
      minutes,
      minutesStr,
      seconds,
      secondsStr,
      status: "runing",
    };
  
    // 需要显示毫秒逻辑处理
    if (showMillisecond) {
      const milliseconds = Math.floor(remainTime * 1000);
      // 只取首位
      const millisecondsStr = String(milliseconds).slice(-3);
      timeInfo.milliseconds = milliseconds;
      timeInfo.millisecondsStr = millisecondsStr;
    }
  
    return timeInfo;
  }
  function computeRemainTime(deadlineTime: number) {
    // 当前时间
    const nowTime = Date.now();
    // 截止时间 - 当前时间 = 剩余时间
    const remainTime = (deadlineTime - nowTime) / 1000;
    return remainTime;
  }
  
  function createCountdown(setTimeInfo: (timeInfo: TimeInfo) => void, options: CountDownOptions) {
      let timer: NodeJS.Timeout;
      function countdown() {
          const remainTime = computeRemainTime(options.deadlineTime);
          // 剩余时间大于 0 才开始倒计时
          if (remainTime > 0) {
              // 未结束时直接定时下一次在执行判断 countdown
              timer = setTimeout(
                    countdown,
                    options.showMillisecond ? 100 : 1000 // 毫秒级则修改定时器时间
              );
          }
          const data = computeCountdownInfo(remainTime, options.showMillisecond);
          setTimeInfo(data);
      }
      const getTimer = () => timer;
      return { getTimer, countdown }
  }
  

// 首次初始化数据，以防页面闪烁


  export const useCountdown = (options: CountDownOptions) => {
    const remainTime = useMemo(
        () => computeRemainTime(options.deadlineTime),
        [options.deadlineTime]
    );
    const [timeInfo, setTimeInfo] = useState<TimeInfo>(
        computeCountdownInfo(remainTime)
    );

    // ...省略
    useEffect(() => {
      // 获取倒计时
      const { getTimer, countdown } = createCountdown(setTimeInfo, options);
      // 开始倒计时
      countdown();
      return () => {
        // 清除定时器
        getTimer() && clearTimeout(getTimer());
      };
    }, [options.deadlineTime, options.showMillisecond]);
    return timeInfo;
  };
